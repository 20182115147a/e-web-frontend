
import { fetchWithAuth } from "../authenServices";

const updateProductService =  async function(formdata:FormData) {
    return fetchWithAuth('https://e-web-backend.onrender.com/update', {
        method:'put',
        body: formdata
    })
}

export default updateProductService