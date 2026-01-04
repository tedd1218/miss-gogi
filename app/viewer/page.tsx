'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ViewerContent() {
  const searchParams = useSearchParams()
  const file = searchParams.get('file')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  if (!file) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#E9DED5]">
        <p className="text-gray-600">No file specified</p>
      </div>
    )
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E9DED5]">
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#E9DED5]">
          <p className="text-gray-600 mb-4">Unable to display PDF in browser.</p>
          <a 
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </a>
        </div>
      )}
      
      <iframe
        src={file}
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="PDF Viewer"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

export default function Viewer() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-[#E9DED5]">
        <p className="text-gray-600">Loading viewer...</p>
      </div>
    }>
      <ViewerContent />
    </Suspense>
  );
}