import { useState } from 'react';
import style from './categorylist.module.css'
import {categories} from '../../assets/variables/variables'
import { useNavigate } from 'react-router-dom';
const CategoryList = () => {
  // Danh sách các thể loại sản phẩm
  const negative = useNavigate()

  // State để lưu thể loại được chọn
  const [selectedCategory, setSelectedCategory] = useState(1);

  // Hàm xử lý khi chọn thể loại
  const handleSelectCategory = (categoryId:number,category:string) => {
    setSelectedCategory(categoryId);
    negative(`/product/show/${category}`)
  };

  return (
    <div className={style["category-container"]}>
      <h1>Tìm theo loại sản phẩm</h1>
      <div className={style["category-list"]}>
        {categories.map((category,index) => (
          <div
            key={index}
            className={`${style["category-item"]} ${
              selectedCategory === category.id ? style["selected"] : ''
            }`}
            onClick={() => handleSelectCategory(category.id,category.value)}
          >
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;