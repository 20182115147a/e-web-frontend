import { useForm, SubmitHandler } from "react-hook-form";
import style from "./form-login.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginServices from "../../services/loginServices";
import { Button, Form, Modal } from "react-bootstrap";
import registerServices from "../../services/registerServices";
import { useAuth } from "../AuthContext/AuthContext";
interface IFormInput {
  username: string;
  password: string;
  loginMessage?: string;
  rePassword?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  avatar: File | null;
  fullName?: string
}
type IFormLogin = {
  isRegister?: boolean;
};
interface IFormRegister {
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  fullName?: string;
  avatar?: File | null;
}

const FormLogin: React.FC<IFormLogin> = function ({ isRegister = false }) {
  const { login: authLogin } = useAuth();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IFormInput>();

  const {
    handleSubmit: handlerSubmitRegister,
    register: register2,
    formState: {errors : errors2}
  } = useForm<IFormRegister>()

  const [loginMessage, setLoginMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);
  const [show, setShow] = useState(false);
  const [avatarFile,setAvatarFile] =  useState<File | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async function handleLogin({
    username,
    password,
  }: IFormInput) {
    if (!isRegister) {
      loginServices({ username, password })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if(data.token && data.user)
          {
            authLogin(data.token,data.user)
          navigate("/")
          }
          const loginMessage = document.getElementById(
            "form-login-message-container"
          );
          if (loginMessage) {
            setLoginMessage(data.message);
            loginMessage.style.display = "block";
          }
        });
    }
    else {
      setShow(true)
    }
  };
  const formRegister = document.getElementById('formRegister')
  if (formRegister) {
    formRegister.onsubmit =function(e) {
      e.preventDefault()
    }
  }
  const onRegister: SubmitHandler<IFormRegister> =  function ({
    email,
    fullName,
    address,
    phone,
    role
   }: IFormRegister) {
    const formData = new FormData();

  
    const username = getValues('username')
    const password = getValues('password')
    formData.append('username',username)
    formData.append('password',password)
    if (email) {
      formData.append('email',email)
    }
    if (fullName) {
      formData.append('fullName',fullName)
    }
    if (address) {
      formData.append('address',address)
    }
    if (role) {
      formData.append('role',role)
    }
    if (avatarFile) {
      formData.append('file',avatarFile)
    }
    if (phone) {
      formData.append('phone',phone)
    }
    registerServices({formData }).then((res) => {
      return res.json()
    }).then((data)=> {
      authLogin(data.token,data.user)
      navigate("/")
    })
     }
  useEffect(() => {
    reset();
    const loginMessage = document.getElementById(
      "form-login-message-container"
    );
    if (loginMessage) {
      loginMessage.style.display = "none";
    }
  }, [location]);
  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAvatarFile(event.target.files[0]);
    }
  };
  return (
    <div className={style["form-login-wrapper"]}>
      <form
        className={style["form-login-container"]}
        id="form-login-container"
        action=""
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className={style["form-login-header-text"]}>
          {isRegister ? "Đăng Ký" : "Đăng Nhập"}{" "}
        </p>
        <div
          id="form-login-message-container"
          className={style["form-login-message-container"]}
        >
          <p className="" {...register("loginMessage")}>
            {loginMessage}
          </p>
        </div>
        <div className={style["form-login-user"]}>
          <input
            className={style["form-login-input"]}
            placeholder="Tên Đăng Nhập"
            type="text"
            {...register("username", {
              required: { value: true, message: "Vui lòng nhập trường này" },
              minLength: { value: 5, message: "Tên đăng nhập tối thiểu 5 ký tự" },
              maxLength: { value: 20, message: "Tên đăng nhập tối đa 20 ký tự" },
              pattern: { value: /^[a-zA-Z0-9]+$/, message: "Tên đăng nhập không hợp lệ" }
            })}
          />
          <p className={style["errors-message"]}>{errors.username?.message}</p>
        </div>
        <div className={style["form-login-password"]}>
          <input
            className={style["form-login-input"]}
            placeholder="Mật Khẩu"
            type={isShowPassword ? "text" : "password"}
            {...register("password", {
              required: { value: true, message: "Vui lòng nhập trường này" },
              minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            })}
          />

          <button
            onClick={function () {
              setIsShowPassword(!isShowPassword);
            }}
            type="button"
          >
            {isShowPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            )}
          </button>
        </div>
        <p className={style["errors-message"]}>{errors.password?.message}</p>
        {isRegister && (
          <div className={style["form-login-password"]}>
            <input
              className={style["form-login-input"]}
              placeholder="Nhập lại mật khẩu"
              type={isShowRePassword ? "text" : "password"}
              {...register("rePassword", {
                required: { value: true, message: "Vui lòng nhập trường này" },
                validate: (value) =>
                  value === watch("password") ||
                  "Mật khẩu nhập lại không chính xác",
              })}
            />
            <button
              onClick={function () {
                setIsShowRePassword(!isShowRePassword);
              }}
              type="button"
            >
              {isShowRePassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              )}
            </button>
          </div>
        )}
        <p className={style["errors-message"]}>{errors.rePassword?.message}</p>
        <button className={style["form-login-submit"]} type="submit">
          {isRegister ? "Đăng Ký" : " Đăng Nhập"}
        </button>
        <p className={style["form-link-register"]}>
          {isRegister ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}{" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Đăng Nhập" : "Đăng Ký"}
          </Link>
        </p>
      </form>
      {/* Tạo modal đăng ký chi tiết */}
      {isRegister && (
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton className={`${style['register-modal']}`}>
            <Modal.Title>Thông Tin Chi Tiết</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form  onSubmit={() => {
                handlerSubmitRegister(onRegister)
              }}
               method="post"
               action=""
               id="formRegister"
              >
              <Form.Group className="mb-3" controlId="emailRegister">
                <Form.Label>Địa Chỉ Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập Email" {...register2("email", {
                  required:"Vui lòng nhập email"
                })}/>
                 <p className={style["errors-message"]}>{errors2.email?.message}</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="fullName" >
                <Form.Label>Tên Đầy Đủ</Form.Label>
                <Form.Control type="text" placeholder="Tên Đầy Đủ" {...register2("fullName",{
                  required:"Vui lòng nhập Tên"
                })}/>
                 <p className={style["errors-message"]}>{errors2.fullName?.message}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control type="text" placeholder="Địa Chỉ" {...register2("address",{
                  required:"Vui lòng nhập địa chỉ"
                })}/>
                 <p className={style["errors-message"]}>{errors2.address?.message}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone" >
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control type="number" placeholder="Số Điện Thoại" {...register2("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Số điện thoại phải gồm 10 chữ số",
              },
            })}/>
             <p className={style["errors-message"]}>{errors2.phone?.message}</p>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Chọn Ảnh Đại Diện</Form.Label>
        <Form.Control type="file" {...register2("avatar", {
                  required:"Vui lòng chọn ảnh đại diện"
                })} onChange={handleAvatarChange} accept="image/*"/>
                <p className={style["errors-message"]}>{errors2.avatar?.message}</p>
      </Form.Group>
              <Form.Select aria-label="Default select example" {...register2("role", {
                  required:"Vui lòng chọn loại tài khoản"
                })}>
                <option value="">Chọn Loại Tài Khoản</option>
                <option value="buyer">Tài Khoản Người Mua</option>
                <option value="seller">Tài Khoản Người Bán</option>
                <p className={style["errors-message"]}>{errors2.role?.message}</p>
              </Form.Select>
              <br />
              <Button variant="primary" type="submit" onClick={handlerSubmitRegister(onRegister)}>
                Hoàn Tất Đăng Ký
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
export default FormLogin;
