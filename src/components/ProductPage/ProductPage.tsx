import React, { useState, useEffect } from "react";
import ProductFilter from "../ProductFiler/ProductFilter";
import ProductMainList from "../ProductMainList/ProductMainList";
import Pagination from "../Pangination/Pangination";
import styles from './product-page.module.css'
import {categories as categoriesVar} from '../../assets/variables/variables'
import { useLocation } from "react-router-dom";

interface Product {
  _id: string;
  name: string;

  price: number;
  category: string;
  images: string[];
  createdAt: string;
}
interface categories {
    id: number;
    name: string;
    value:string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<categories[]>([]);
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState<string>(location.pathname.slice(14));
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 20;
  

  const fetchProducts = async (page: number, category: string, sortBy: string) => {
    try {
      const response = await fetch(
        `https://e-web-backend.onrender.com/products?page=${page}&limit=${itemsPerPage}&category=${category}&sortBy=${sortBy}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    
    setCategories(categoriesVar);
  },[])

  useEffect(  () => {
    
     fetchProducts(currentPage, selectedCategory, sortBy);
     
  }, [currentPage, selectedCategory, sortBy]);


  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy); 
  };


  return (
    <div className={styles['container']}>
      <ProductFilter
        onSortChange={handleSortChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
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

export default ProductPage;
