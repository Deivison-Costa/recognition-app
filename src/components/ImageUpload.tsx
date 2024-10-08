import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

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

      {/* Botão de upload com texto de carregamento */}
      <Button type="submit" disabled={!file || isLoading}>
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Recognizing...
          </span>
        ) : (
          'Upload and Recognize'
        )}
      </Button>

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-center">Result:</h2>

          {/* Ajustes para a quebra de linha automática no JSON e centralização */}
          <div
            className="bg-gray-100 p-2 rounded overflow-auto mx-auto"
            style={{ maxHeight: '200px', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>

          {/* Centralização da Imagem */}
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
    </form>
  )
}
