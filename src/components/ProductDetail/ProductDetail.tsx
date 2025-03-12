import React, { useState } from "react";
import { Product } from "../../assets/variables/types";
import styles from './productdetail.module.css'
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [show, setShow] = useState(false);
  const negative = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }))
        handleShow()
      };
  return (
    <div className={styles["product-detail"]}>
      <h1>{product.name}</h1>
      <div className={styles["product-images"]}>
        {product.images.map((image, index) => (
          <img key={index} src={`${image}`} alt={`Product ${index + 1}`} />
        ))}
      </div>
      <p>{product.description}</p>
      <p>Giá: {product.price.toLocaleString()} VNĐ</p>
      <p>Số lượng tồn kho: {product.stock}</p>
      <p>Người bán: {product.seller.username}</p>
      <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>
      <div className={styles["ratings"]}>
        <h3>Đánh giá:</h3>
        {product.ratings.length > 0 ? (
          product.ratings.map((rating, index) => (
            <div key={index} className={styles["ratings"]}>
              <p>Điểm: {rating.rating}</p>
              <p>Bình luận: {rating.comment}</p>
              <p>Ngày đánh giá: {new Date(rating.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm vào giỏ hàng thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sản đã được thêm vào giỏ hàng của bạn</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Tiếp tục mua sản phẩm
          </Button>
          <Button variant="primary" onClick={() => {
            negative('/cart')
          }}>
            Đến giỏ hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  );
};

export default ProductDetail;