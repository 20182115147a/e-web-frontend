import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import style from './product-crud.module.css'
import { categories } from "../../assets/variables/variables"
import { SubmitHandler, useForm } from "react-hook-form"
import { ProductCRUD as TProductCRUD } from "../../assets/variables/types"
import { useAuth } from "../AuthContext/AuthContext"
import createProductService from "../../services/ProductServices/createProductServices"
import {validateNumber, validateImage} from "../../utils/validate"
import { useLocation, useNavigate } from "react-router-dom"
import getProductDetailServices from "../../services/ProductServices/getProductDetailServices"
import updateProductService from "../../services/ProductServices/updateProductServices"
const ProductCRUD:React.FC = function() {
    const {formState: { errors }, register,handleSubmit,reset,setValue} = useForm<TProductCRUD>()
    const {getUser,getProductId} = useAuth()
    const user = getUser()
    const [show, setShow] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)
    const location = useLocation()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const negative = useNavigate()
    const [files, setFiles] = useState<File[]>([]);
    useEffect(() => {
      if (location.pathname === '/product/update'){
      setIsUpdate(true)
      }
    },[location.pathname])
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files; // Lấy các file đã chọn
       if(selectedFiles) {
        setFiles([...selectedFiles]); // Cậ
       }
        
      };
      const onSubmit: SubmitHandler<TProductCRUD> = function({
        name,
        description,
        price,
        category,
        stock
      }) {
        console.log(user)
          const formData = new FormData()

          if(name) {
            formData.append('name',name)
          }
          
          if(description) {
            formData.append('description',description)
          }
          if(price) {
            formData.append('price',price)
          }
          if(category) {
            formData.append('category',category)
          }
          if(files) {
            files.forEach((image) => {
              formData.append('images',image)
            })
          }
          if(user?._id) {
            formData.append('seller',user._id)
          }
          if(stock) {
            formData.append('stock',stock)
          }
          if (isUpdate) {
            const id = getProductId()
            if(id) {
              formData.append('id',id)
            }
            updateProductService(formData).then((res) => {
              return res.json() 
            }).then(() => {
              handleShow()
            }) 
          }
          else {
            createProductService(formData).then((res) => {
              if(res.status === 201) {
                reset()
                handleShow()
              }
            })
          }
      }
    useEffect(() => {
      if(isUpdate) {
       const productId = getProductId()
       if(productId) {
        getProductDetailServices(productId).then((res) => {
          return res.json()
         }).then((data) => {
          setValue('category',data.product.category)
          setValue('description',data.product.description)
          setValue('price',data.product.price)
          setValue('name',data.product.name)
          setValue('stock',data.product.stock)
         })
       }
       else {
        negative('/')
       }

      }
    },[isUpdate,getProductId])
    const negativeMyProduct = () => {
      negative('/product/my-product')
      handleClose()
    }
    return <div className={style["form-container"]}>
    <h1>Tạo Sản Phẩm Mới</h1>
      <Form method="post" className={style["form-wrapper"]}  onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Tên Sản Phẩm</Form.Label>
        <Form.Control type="text" placeholder="Nhập tên sản phẩm" {...register("name", {
              required: { value: true, message: "Vui lòng nhập trường này" },
            })}/>
        <p className={style["errors-message"]}>{errors.name?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="productDesc">
        <Form.Label>Mô tả chi tiết</Form.Label>
        <Form.Control type="text" placeholder="Nhập mô tả" {...register("description", {
              required: { value: true, message: "Vui lòng nhập trường này" },
            })} />
          <p className={style["errors-message"]}>{errors.description?.message}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ProductPrice">
        <Form.Label>Giá</Form.Label>
        <Form.Control type="string" placeholder="Nhập giá tiền" {...register("price", {
              required: { value: true, message: "Vui lòng nhập trường này" },
              validate: validateNumber
            })}/>
            <p className={style["errors-message"]}>{errors.price?.message}</p>
      </Form.Group>
      <Form.Group>

      <Form.Label>Thể loại</Form.Label>
      <Form.Select aria-label="Default select example" {...register("category",  {
              required: { value: true, message: "Vui lòng chọn trường này" },
            })}>
      <option value="">Chọn thể loại</option>
      {categories.map((cate) => {
          return <option value={cate.value}>{cate.name}</option>

      })}
    </Form.Select>
    <p className={style["errors-message"]}>{errors.category?.message}</p>

      </Form.Group>
       <Form.Group controlId="productFile" className="mb-3">
              <Form.Label>Chọn Ảnh Sản Phẩm (giữ CTRL hoặc Shift để chọn nhiều hơn 1 ảnh)</Form.Label>
              <Form.Control type="file" {...register("images", {
                onChange:handleFileChange,
                required: { value: true, message: "Vui lòng chọn trường này" },
                validate: validateImage 
              })} multiple accept="image/*"/>
              <p className={style["errors-message"]}>{errors.images?.message}</p>
            </Form.Group>   
      <Form.Group className="mb-3" controlId="productStock">
        <Form.Label>Tổng hàng</Form.Label>
        <Form.Control type="text" placeholder="Nhập tổng hàng" {...register("stock", {
           required: { value: true, message: "Vui lòng chọn trường này" },
           validate: validateNumber
        })}/>
        <p className={style["errors-message"]}>{errors.stock?.message}</p>
      </Form.Group>
      <Button variant="primary" type="submit" onSubmit={(e) => {
        e.preventDefault()
      }} >
        {isUpdate ? 'Cập nhật sản phẩm': 'Tạo sản phẩm'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{!isUpdate ? 'Tạo Sản Phẩm Thành Công' : 'Cập nhật Sản Phẩm Thành Công'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{!isUpdate ? 'Sản Phẩm Đã Được Tạo Thành Công' : 'Sản Phẩm Đã Được Cập nhật Thành Công'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {!isUpdate ? 'Tạo thêm sản phẩm' : 'Cập nhật lại'}
          </Button>
          <Button variant="primary" onClick={negativeMyProduct}>
            Sản Phẩm của tôi
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
    </div>
}
export default ProductCRUD