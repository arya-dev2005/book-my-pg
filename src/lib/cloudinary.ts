import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  resource_type: 'image' | 'video'
}

export const uploadToCloudinary = async (
  file: File,
  folder: string = 'book-my-pg'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      },
      (error, result) => {
        if (error) reject(error)
        else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            resource_type: result.resource_type === 'video' ? 'video' : 'image'
          })
        }
      }
    )

    // Convert file to buffer and upload
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        uploadStream.end(Buffer.from(reader.result as ArrayBuffer))
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

export default cloudinary