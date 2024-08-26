import { useState } from "react";

function PlaceOrder() {
  const [status, setStatus] = useState(null);

  const handlePlaceOrder = async () => {
    // Sample data for recipient and product
    // const recipient = {
    //   name: "John Doe",
    //   address1: "123 Test St",
    //   city: "Testville",
    //   state_code: "CA",
    //   country_code: "US",
    //   zip: "90001",
    // };

    const recipient = {
      external_id: "4235234213",
      shipping: "STANDARD",
      recipient: {
        name: "John Smith",
        company: "John Smith Inc",
        address1: "19749 Dearborn St",
        address2: "string",
        city: "Chatsworth",
        state_code: "CA",
        state_name: "California",
        country_code: "US",
        country_name: "United States",
        zip: "91311",
        phone: "2312322334",
        email: "firstname.secondname@domain.com",
        tax_number: "123.456.789-10",
      },
      items: [
        {
          id: 1,
          external_id: "item-1",
          variant_id: 1,
          sync_variant_id: 1,
          external_variant_id: "variant-1",
          warehouse_product_variant_id: 1,
          product_template_id: 1,
          external_product_id: "template-123",
          quantity: 1,
          price: "13.00",
          retail_price: "13.00",
          name: "Enhanced Matte Paper Poster 18×24",
          product: {
            variant_id: 3001,
            product_id: 301,
            image:
              "https://files.cdn.printful.com/products/71/5309_1581412541.jpg",
            name: "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)",
          },
          files: [
            {
              type: "default",
              url: "​https://www.example.com/files/tshirts/example.png",
              options: [
                {
                  id: "template_type",
                  value: "native",
                },
              ],
              filename: "shirt1.png",
              visible: true,
              position: {
                area_width: 1800,
                area_height: 2400,
                width: 1800,
                height: 1800,
                top: 300,
                left: 0,
                limit_to_print_area: true,
              },
            },
          ],
          options: [
            {
              id: "OptionKey",
              value: "OptionValue",
            },
          ],
          sku: null,
          discontinued: true,
          out_of_stock: true,
        },
      ],
      retail_costs: {
        currency: "USD",
        subtotal: "10.00",
        discount: "0.00",
        shipping: "5.00",
        tax: "0.00",
      },
      gift: {
        subject: "To John",
        message: "Have a nice day",
      },
      packing_slip: {
        email: "your-name@your-domain.com",
        phone: "+371 28888888",
        message: "Message on packing slip",
        logo_url: "​http://www.your-domain.com/packing-logo.png",
        store_name: "Your store name",
        custom_order_id: "kkk2344lm",
      },
    };

    const store_id = 14234557;

    const productVariantId = 4011; // Example variant ID for a t-shirt or other product

    // Assuming you have the imageData from somewhere, like a previous upload step
    // Use the actual imageData or Cloudinary URL
    // const imageData = "data:image/png;base64,...";
    // const imageData ="https://res.cloudinary.com/dnoiiw1jg/image/upload/custom_image";
    const imageData =
      "https://res.cloudinary.com/dnoiiw1jg/image/upload/custom_image.png";

    console.log("imageData", imageData);

    const res = await fetch("/api/printful", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData, recipient, productVariantId, store_id }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus(`Order placed successfully! Order ID: ${data.result.id}`);
    } else {
      setStatus(`Failed to place order: ${data.error}`);
    }
  };

  return (
    <div>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default PlaceOrder;
