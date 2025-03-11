import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProductDetailServices from "../../services/ProductServices/getProductDetailServices";
import ProductDetail from "../ProductDetail/ProductDetail";
import { Product } from "../../assets/variables/types";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       getProductDetailServices(id!).then((res) => {
        return res.json()
       }).then((data) => {
           setProduct(data.product);
       })
      } catch (err) {
        console.log(err)
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;