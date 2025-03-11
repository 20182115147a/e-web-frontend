import { fetchWithAuth } from "./authenServices";


interface ILogin {
  username: string;
  password: string;
}
const loginServices= async function (user :ILogin) {
   return await fetchWithAuth("https://e-web-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username : user.username,
          password : user.password,
        }),
      })
}
export default  loginServices