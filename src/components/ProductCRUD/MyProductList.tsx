import { useEffect, useState } from "react"
import styles from "./my-product.module.css"
import getProductByUserServices from "../../services/ProductServices/getProductByUserServices"
import { useAuth } from "../AuthContext/AuthContext"
import { ProductCRUD } from "../../assets/variables/types"
import { Button, Modal, Table } from "react-bootstrap"
import deleteProductServices from "../../services/ProductServices/deleteProductServices"
import { useNavigate } from "react-router-dom"
const MyProductList: React.FC = function() {
    const {getUser,setProduct} = useAuth()
    const [products,setProducts] = useState<ProductCRUD[]>([])
    const [show, setShow] = useState(false);
    const [product, setProductId] = useState("");
    const user = getUser()?.id
    const navigate = useNavigate();
    useEffect(() => {
        if(user) {
            getProductByUserServices(user).then((res) => {
                return res.json()
            }).then((data) => {
                setProducts(data.products)
            })
        }
    },[user])

    const handleClose = () => {
        deleteProductServices(product)
        setProducts(products.filter((productItem) => {
           return productItem._id !== product
        }) 
        )
        setShow(false)
    };
    const handleDelete = (id: string) => {
        setShow(true)
        setProductId(id)
    };
    const handleUpdate =(id:string) => {
        setProduct(id)
        navigate('/product/update')
    }
    return <div className={styles["my-product-list-container"]}>
        <h1>Sản Phẩm Của Tôi</h1>
        <Table striped bordered hover responsive="md">
            <thead>
                <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên Sản Phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
               {products && products.map((product,index) => {
                return  <tr>
                <td>{index + 1}</td>
                <td><img className={styles["product-image"]} src={`${product.images[0]}`}/></td>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>
                <Button  onClick={() => {
                    handleDelete(product._id)
                }}><i className="bi bi-trash btn-danger"></i></Button>
                <Button  onClick={() => {
                    handleUpdate(product._id)}}>
                <i className="bi bi-pencil-square"></i>
                </Button>
                </td>
                </tr>
               })}
            </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xoá sản phẩm này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Xoá Sản Phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
}
export default MyProductList