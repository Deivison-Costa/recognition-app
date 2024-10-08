import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function WebcamCapture() {
  const webcamRef = useRef<Webcam>(null)
  const [result, setResult] = useState<any>(null)

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      const blob = await fetch(imageSrc).then(res => res.blob())
      const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' })

      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch('http://localhost:8000/user/recognition/', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        setResult(data)
      } catch (error) {
        console.error('Error:', error)
        setResult({ error: 'An error occurred while processing the image' })
      }
    }
  }

  return (
    <div className="space-y-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full max-w-md mx-auto"
      />
      <Button onClick={capture}>Capture and Recognize</Button>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-center">Result:</h2>

          <div 
            className="bg-gray-100 p-4 rounded overflow-auto mx-auto" 
            style={{ maxHeight: '200px', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>

          {result.image && (
            <div className="mt-4 flex justify-center">
              <Image 
                src={`data:image/jpeg;base64,${result.image}`} 
                alt="Recognized face" 
                width={500} 
                height={500}
                className="mx-auto"
                unoptimized
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
