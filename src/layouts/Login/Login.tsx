
import ShopeeLogo from "../../components/ShopeeLogo/ShopeeLogo" 
import FormLogin from "../../components/FormLogin/FormLogin"
import style from './login.module.css'
import { useLocation } from "react-router-dom"

 const Login: React.FC = () => {
    const location = useLocation()
    const isRegister = location.pathname === '/register' 
    return <div className={style['login-container']}>
        <div className={style['login-header']}>
            <div className={style['left-header']}>
                <ShopeeLogo style={{height:'50px', width:'100px'}}></ShopeeLogo>
                <p className={style['login-text']}>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</p>
            </div>
            <div className={style['right-header']}>
                <a href="https://help.shopee.vn/portal/4/vn/s" target="_blank" className={style['need-help-btn']}>
                    Bạn cần giúp đỡ?

                </a>
            </div>
        </div>
        <div className={style['login-content-container']}>
        <div className={style['login-content']}>
            <FormLogin isRegister={isRegister}></FormLogin>
        </div>
        </div>
    </div>
}
export default Login