import { fetchWithAuth } from "../authenServices";


interface Icheckout {
    userId: string | undefined;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    paymentMethod: string;
    shippingAddress: string | undefined;
}
const checkoutServices= async function (checkout :Icheckout) {
   return await fetchWithAuth("https://e-web-backend.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkout),
      })
}
export default  checkoutServices