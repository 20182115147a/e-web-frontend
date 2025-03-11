import { fetchWithAuth } from "../authenServices"

const deleteProductServices = async function(id: string)  {
    await fetchWithAuth(`https://e-web-backend.onrender.com/products/delete/${id}`, {
        method:'delete'
    })
}
export default deleteProductServices