import { v2 as cloudinary } from 'cloudinary';
import fetch from 'node-fetch';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});


export async function POST(req) {
  const { imageData, publicId, recipient, productVariantId, store_id } = await req.json();

  try {
    // Step 1: Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageData, {
      public_id: publicId || 'default_image',
    });

    console.log('uploadResult', uploadResult)
    console.log('productVariantId', productVariantId)
    console.log('storeId', store_id)
    // console.log('productVariantId', productVariantId)

    // Step 2: Create an order in Printful with the Cloudinary image URL
    const printfulResponse = await fetch(`https://api.printful.com/stores/${store_id}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient: recipient, // Pass recipient details (name, address, etc.)
        items: [
          {
            variant_id: productVariantId, // ID of the product variant (t-shirt, mug, etc.)
            quantity: 1,
            files: [
              {
                url: uploadResult.secure_url, // Cloudinary image URL
              },
            ],
          },
        ],
      }),
    });

    console.log('printfulResponse', printfulResponse)

    const printfulData = await printfulResponse.json();

    if (!printfulResponse.ok) {
        console.error('Printful error:', printfulData); // Log the full error message
      throw new Error(printfulData.error.message || 'Failed to create order');
    //   return new Response(JSON.stringify(printfulData), { status: printfulResponse.status });
    }

    return new Response(JSON.stringify(printfulData), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);

    // return new Response(JSON.stringify({ error: 'Failed to process the order' }), { status: 500 });
    return new Response(JSON.stringify({ error: 'Failed to process the order', details: errorMessage }), { status: 500 });
  }
}
