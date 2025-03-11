import CategoryList from "../../components/Category/CategoryList"
import ProductList from "../../components/ProductList/ProductList"
import Slider from "../../components/Slider/Slider"
import style from './content.module.css'
const Content:React.FC = function() {
    return <div className={style['content-container']}>
        <div className={style['content-Wrapper']}><Slider></Slider>
        <CategoryList></CategoryList>
        <ProductList></ProductList>
        </div>
    </div>
}
export default Content