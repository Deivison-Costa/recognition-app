'use client'

import { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import WebcamCapture from '../components/WebcamCapture'
import AddFace from '../components/AddFace'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [mode, setMode] = useState<'upload' | 'webcam' | 'add' | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Face Recognition App</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button onClick={() => setMode('upload')}>Upload Image</Button>
        <Button onClick={() => setMode('webcam')}>Use Webcam</Button>
        <Button onClick={() => setMode('add')}>Add New Face</Button>
      </div>
      {mode && (
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'upload' && 'Upload Image'}
              {mode === 'webcam' && 'Capture from Webcam'}
              {mode === 'add' && 'Add New Face'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mode === 'upload' && <ImageUpload />}
            {mode === 'webcam' && <WebcamCapture />}
            {mode === 'add' && <AddFace />}
          </CardContent>
        </Card>
      )}
    </div>
  )
}