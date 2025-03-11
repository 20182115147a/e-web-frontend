import Cart from "../components/Cart/Cart"
import OrderHistory from "../components/Order/Order"
import MyProductList from "../components/ProductCRUD/MyProductList"
import ProductCRUD from "../components/ProductCRUD/ProductCRUD"
import ProductDetailPage from "../components/ProductDetailPage/ProductDetailPage"
import ProductPage from "../components/ProductPage/ProductPage"
import ProductSearchPage from "../components/ProductSearchPage/ProductSearchPage"
import Content from "../layouts/Content/Content"
import Login from "../layouts/Login/Login"


const RoutesConfig = [
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Login
    },
    {
        path: '/',
        element: Content
    },
    {
        path:'/products/:id',
        element: ProductDetailPage
    },
    {
        path: '/product/create',
        element: ProductCRUD
    },
    {
        path: '/product/update',
        element: ProductCRUD
    },
    {
        path: '/product/my-product',
        element: MyProductList
    },
    {
        path:'/product',
        element: ProductPage
    },
    {
        path:'/product/show/:cate',
        element: ProductPage
    },
    {   path:'/product/search',
        element: ProductSearchPage
    },
    {   path:'/cart',
        element: Cart
    },
    {
        path: '/orders',
        element: OrderHistory
    }
]
export default RoutesConfig