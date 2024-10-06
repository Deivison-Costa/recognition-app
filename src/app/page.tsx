'use client'

import { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import WebcamCapture from '../components/WebcamCapture'
import AddFace from '../components/AddFace'
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [mode, setMode] = useState<'upload' | 'webcam' | 'add' | null>(null)

  return (
    <div className="container mx-auto p-4">
      <Navbar setMode={setMode} />
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
