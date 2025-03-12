import React, { useEffect, useState } from 'react';
import styles from './productlist.module.css'; // Import CSS module
import getProductServices from '../../services/ProductServices/getProductServices';
import { useNavigate } from 'react-router-dom';


type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
};


const ProductList: React.FC = () => {
  const navigate = useNavigate();
    const [products,setProducts] = useState<Product[]>([])
    useEffect(() => {
      getProductServices().then((res) => {
        return res.json()
    }).then((data) => {
      setProducts(data.products)
    })
    },[])
    const handleLoadMore = () => {
        // Bạn có thể thêm logic để tải thêm sản phẩm tại đây
        navigate('/product')
      };
    const handleShowProduct = (id: string) => {
      navigate(`/products/${id}`)
    }
  return (
    <div className={styles.container}>
      <h1>Gợi ý sản phẩm</h1>
      <div className={styles.productList} >
        {products.map((product) => (
          <div key={product._id} className={styles.product} onClick={() => {
            handleShowProduct(product._id)
          }}>
            <img src={product.images[0]} alt={product.name} className={styles.productImg} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.price}>{product.price}</p>
            <p className={styles.stock}>Số lượng: {product.stock}</p>
          </div>
        ))}
      </div>
      <button className={styles.loadMoreButton} onClick={handleLoadMore}>
        Xem thêm
      </button>
    </div>
  );
};

export default ProductList;
