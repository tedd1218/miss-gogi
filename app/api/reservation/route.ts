import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import path from 'path'

interface ReservationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  partySize: string
}

// Generate ICS calendar file content
function generateICSFile(data: {
  firstName: string
  lastName: string
  date: string
  time: string
  partySize: string
}): string {
  const { firstName, lastName, date, time, partySize } = data
  
  // Parse the date and time
  const reservationDate = new Date(date)
  const [timeStr, period] = time.split(' ')
  const [hours, minutes] = timeStr.split(':').map(Number)
  
  let hour24 = hours
  if (period === 'PM' && hours !== 12) hour24 += 12
  if (period === 'AM' && hours === 12) hour24 = 0
  
  reservationDate.setHours(hour24, minutes, 0, 0)
  
  // End time is 2 hours after start
  const endDate = new Date(reservationDate.getTime() + 2 * 60 * 60 * 1000)
  
  // Format dates for ICS (YYYYMMDDTHHMMSS)
  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  const uid = `reservation-${Date.now()}@missgogi.com`
  const now = formatICSDate(new Date())
  const start = formatICSDate(reservationDate)
  const end = formatICSDate(endDate)
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Miss Gogi Korean BBQ//Reservation//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:Reservation at Miss Gogi Korean BBQ
DESCRIPTION:Reservation for ${firstName} ${lastName}\\nParty Size: ${partySize} guests\\n\\nAddress: 6035 Peachtree Rd, Doraville, GA 30360\\nPhone: (770) 220-3003
LOCATION:Miss Gogi Korean BBQ, 6035 Peachtree Rd, Doraville, GA 30360
STATUS:CONFIRMED
ORGANIZER;CN=Miss Gogi:mailto:${process.env.EMAIL_USER}
END:VEVENT
END:VCALENDAR`
}

export async function POST(request: Request) {
  try {
    const data: ReservationData = await request.json()
    const { firstName, lastName, email, phone, date, time, partySize } = data

    // Format the date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Email to restaurant
    const restaurantEmailSubject = `New Reservation Request - ${firstName} ${lastName}`
    const restaurantEmailBody = `
New Reservation Request

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Date: ${formattedDate}
Time: ${time}
Party Size: ${partySize}

Please contact the customer to confirm the reservation.
    `.trim()

    // Confirmation email to customer
    const siteUrl = process.env.SITE_URL || 'https://miss-gogi.vercel.app'
    const customerEmailSubject = `Reservation Request Received – Miss Gogi Korean BBQ`
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Georgia, serif; color: #2d2a26; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 30px 0; }
    .header img { max-width: 500px; width: 100%; height: auto; }
    .content { padding: 30px 0; }
    .details { background: #f5ede4; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .details p { margin: 8px 0; }
    .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e8dfd5; color: #666; font-size: 14px; }
    .note { background: #fff3e0; padding: 15px; border-left: 4px solid #f68634; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${siteUrl}/images/miss-gogi-header.png" alt="Miss Gogi Korean BBQ" />
    </div>
    <div class="content">
      <p>Dear ${firstName},</p>
      <p>Thank you for your reservation request! We have received your details and will confirm your reservation shortly.</p>
      
      <div class="details">
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Party Size:</strong> ${partySize} guests</p>
      </div>
      
      <div class="note">
        <strong>Please Note:</strong> This is a reservation request, not a confirmed reservation. Our team will contact you to confirm availability.
      </div>
      
      <div style="margin: 25px 0;">
        <p style="margin-bottom: 10px;"><strong>Location:</strong></p>
        <a href="https://maps.app.goo.gl/RjCtJiwL4g7SZ32F7" target="_blank" style="text-decoration: none;">
          <div style="border: 1px solid #e8dfd5; border-radius: 8px; overflow: hidden;">
            <div style="padding: 15px; background: #f5ede4;">
              <p style="margin: 0; color: #2d2a26; font-weight: bold;">Miss Gogi Korean BBQ</p>
              <p style="margin: 5px 0 0 0; color: #666;">6035 Peachtree Rd Ste C115, Doraville, GA 30360</p>
              <p style="margin: 10px 0 0 0; color: #f68634; font-weight: bold;">📍 Get Directions →</p>
            </div>
          </div>
        </a>
      </div>
      
      <p>If you have any questions, please call us at <a href="tel:7702203003" style="color: #f68634;">(770) 220-3003</a>.</p>
      <p>In the meantime, please take a look at our menus, attached to this email, along with a calendar invite.</p>
      <p>We look forward to serving you!</p>
      <p>— The Miss Gogi Team</p>
    </div>
    <div class="footer">
      <p>Miss Gogi Korean BBQ | 6035 Peachtree Rd, Doraville, GA 30360</p>
    </div>
  </div>
</body>
</html>
    `.trim()

    // Generate calendar invite
    const icsContent = generateICSFile({ firstName, lastName, date, time, partySize })

    // SMS content
    const smsBody = `New reservation: ${firstName} ${lastName}, ${partySize} guests, ${formattedDate} at ${time}. Phone: ${phone}`

    // Send emails using Nodemailer with OAuth2
    if (
      process.env.GMAIL_CLIENT_ID &&
      process.env.GMAIL_CLIENT_SECRET &&
      process.env.GMAIL_REFRESH_TOKEN
    ) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
      })

      // Send to restaurant
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RESTAURANT_EMAIL || process.env.EMAIL_USER,
        subject: restaurantEmailSubject,
        text: restaurantEmailBody,
      })
      console.log('Restaurant email sent successfully')

      // Send confirmation to customer with calendar invite and menus
      await transporter.sendMail({
        from: `"Miss Gogi Korean BBQ" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: customerEmailSubject,
        html: customerEmailHtml,
        attachments: [
          {
            filename: 'reservation.ics',
            content: icsContent,
            contentType: 'text/calendar; charset=utf-8; method=REQUEST',
          },
          {
            filename: 'Food-Menu.pdf',
            path: path.join(process.cwd(), 'public', 'foodmenu.pdf'),
          },
          {
            filename: 'AYCE-Menu.pdf',
            path: path.join(process.cwd(), 'public', 'aycemenu.pdf'),
          },
          {
            filename: 'Drink-Menu.pdf',
            path: path.join(process.cwd(), 'public', 'drinkmenu.pdf'),
          },
        ],
      })
      console.log('Customer confirmation email sent successfully')
    }

    // Send SMS using Twilio
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      )

      await client.messages.create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.RESTAURANT_PHONE || '',
      })

      console.log('SMS sent successfully')
    } catch (smsError) {
      console.error('SMS failed:', smsError)
    }

    // Log the reservation
    console.log('Reservation received:', {
      restaurantEmailSubject,
      restaurantEmailBody,
      smsBody,
    })

    return NextResponse.json(
      { message: 'Reservation request received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing reservation:', error)
    return NextResponse.json(
      { message: 'Failed to process reservation' },
      { status: 500 }
    )
  }
}
