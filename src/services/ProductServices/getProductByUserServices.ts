import { fetchWithAuth } from "../authenServices"

const getProductByUserServices = async function(user: string | undefined) {
    return await fetchWithAuth('https://e-web-backend.onrender.com/products/user', {
        method:'post',
        headers: {
            "Content-Type": "application/json",
          },
        body:  JSON.stringify({
            user
        })
        
    })
}
export default getProductByUserServices