import { fetchWithAuth } from "../authenServices"

const getProductServices = async function()  {
   return await fetchWithAuth('https://e-web-backend.onrender.com/products/getall')
}

export default getProductServices