import React from "react";
import styles from "./ProductFilter.module.css";

interface ProductFilterProps {
  categories: categories[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
}
interface categories {
    id: number;
    name: string;
    value:string;
}
const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.title}>Loại sản phẩm</h3>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryItem}>
            <label>
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={selectedCategory === category.value}
                onChange={() => onCategoryChange(category.value)}
                className={styles.radioButton}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
      <div className={styles.sortContainer}>
        <label className={styles.sortLabel}>Sắp xếp theo: </label>
        <select onChange={(e) => onSortChange(e.target.value)} className={styles.sortSelect}>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
