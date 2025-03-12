import React from "react";
import styles from "./ProductList.module.css";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  createdAt: string;
}

interface ProductMainListProps {
  products: Product[];
  onSort: (sortBy: string) => void;
}

const ProductMainList: React.FC<ProductMainListProps> = ({ products, onSort }) => {
    const navigate = useNavigate()
    const handleShowProduct = (id: string) => {
        navigate(`/products/${id}`)
      }
  return (
    <div className={styles.productListContainer}>
      <div className={styles.sortContainer}>
        <label className={styles.sortLabel}>Sắp xếp theo: </label>
        <select onChange={(e) => onSort(e.target.value)} className={styles.sortSelect} >
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product._id} className={styles.productItem} onClick={() => {
            handleShowProduct(product._id)
          }}>
            <img
              src={`${product.images[0]}`}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price.toLocaleString()} VNĐ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMainList;
