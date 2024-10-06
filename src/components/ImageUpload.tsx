import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://127.0.0.1:8000/user/recognition/', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unknown error occurred')
      }
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({ error: error instanceof Error ? error.message : 'An unknown error occurred' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="image">Select an image:</Label>
        <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
      </div>
      <Button type="submit" disabled={!file || isLoading}>
        {isLoading ? 'Recognizing...' : 'Upload and Recognize'}
      </Button>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Result:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </form>
  )
}