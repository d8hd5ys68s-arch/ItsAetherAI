'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-2xl w-full glass-card p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-2 text-gradient">Upload Your Avatar</h1>
        <p className="text-gray-400 mb-8">Upload an image to Vercel Blob storage</p>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];
            setUploading(true);

            try {
              const response = await fetch(
                `/api/avatar/upload?filename=${file.name}`,
                {
                  method: 'POST',
                  body: file,
                },
              );

              const newBlob = (await response.json()) as PutBlobResult;
              setBlob(newBlob);
            } catch (error) {
              console.error('Upload failed:', error);
              alert('Upload failed. Please try again.');
            } finally {
              setUploading(false);
            }
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium text-gray-300">
              Select Image
            </label>
            <Input
              id="file"
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/jpeg, image/png, image/webp"
              required
              className="bg-white/5 border-white/10"
            />
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="btn-gradient w-full"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>

        {blob && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold text-accent">Upload Successful!</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Blob URL:</p>
              <a
                href={blob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline break-all block"
              >
                {blob.url}
              </a>
            </div>
            {blob.url && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Preview:</p>
                <img
                  src={blob.url}
                  alt="Uploaded avatar"
                  className="max-w-full h-auto rounded-lg border border-white/10"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
