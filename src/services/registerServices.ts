import { fetchWithAuth } from "./authenServices";

interface IRegister {
  formData: FormData
}
const registerServices = async function (user: IRegister) {
  return await fetchWithAuth("https://e-web-backend.onrender.com/register", {
    method: "POST",
    body:user.formData
  });
};
export default registerServices;
