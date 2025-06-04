// This file will contain Cloudinary client configuration 

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Helper function for optimized image URLs
export function buildImageUrl(publicId: string, transformations?: string) {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformations || 'f_auto,q_auto,w_auto,dpr_auto'
  })
} 