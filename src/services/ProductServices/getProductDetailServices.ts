import { fetchWithAuth } from "../authenServices"

const getProductDetailServices = async function(id: string)  {
    return await fetchWithAuth(`https://e-web-backend.onrender.com/products/getproduct/${id}`)
 }
 
 export default getProductDetailServices