
import { fetchWithAuth } from "../authenServices";

const createProductService =  async function(formdata:FormData) {
    return fetchWithAuth('https://e-web-backend.onrender.com/products/create', {
        method:'post',
        body: formdata
    })
}

export default createProductService