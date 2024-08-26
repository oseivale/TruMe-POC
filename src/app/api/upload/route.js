import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { imageData, publicId } = await req.json();

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageData, {
      public_id: publicId || 'default_image',
    });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });

    // Transform the image: auto-crop to square aspect ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    return new Response(
      JSON.stringify({
        uploadResult,
        optimizeUrl,
        autoCropUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload image' }), { status: 500 });
  }
}
  