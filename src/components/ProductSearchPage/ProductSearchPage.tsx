import React, { useState, useEffect } from "react";
import ProductMainList from "../ProductMainList/ProductMainList";
import Pagination from "../Pangination/Pangination";
import styles from '../ProductPage/product-page.module.css'

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchProducts } from "../../features/product/productSlice";

interface Product {
  _id: string;
  name: string;

  price: number;
  category: string;
  images: string[];
  createdAt: string;
}

const ProductSearchPage: React.FC = () => {
    const { productsSearch,totalPage,queryString } = useSelector((state: RootState) => state.product);
    const dispatch = useAppDispatch()
  const [products, setProducts] = useState<Product[]>([]);

  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 20;
  



  useEffect(  () => {
      dispatch(fetchProducts({
          query: queryString,
          page:currentPage,
          limit: itemsPerPage,
          sortBy
        }))
        
        setTotalPages(totalPage)
     
  }, [currentPage, sortBy,queryString]);
  useEffect(() => {
    setProducts(productsSearch)
  },[productsSearch,sortBy])




  return (
    <div className={styles['container']}>
      <div style={{ flex: 1 }}>
        <ProductMainList products={products} onSort={setSortBy} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductSearchPage;
