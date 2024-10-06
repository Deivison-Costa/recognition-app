import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"

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
          <h2 className="text-xl font-semibold">Result:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}