import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLinks}>
          <div className={styles.column}>
            <h4 className={styles.heading}>Trợ giúp</h4>
            <ul>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Hướng dẫn bán hàng</a></li>
              <li><a href="#">Chăm sóc khách hàng</a></li>
              <li><a href="#">Tìm hiểu về Shopee</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.heading}>Thông tin</h4>
            <ul>
              <li><a href="#">Giới thiệu về Shopee</a></li>
              <li><a href="#">Điều khoản và điều kiện</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Liên hệ với chúng tôi</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.heading}>Đối tác</h4>
            <ul>
              <li><a href="#">ShopeePay</a></li>
              <li><a href="#">ShopeeMall</a></li>
              <li><a href="#">ShopeeFood</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.heading}>Theo dõi chúng tôi</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 Shopee Việt Nam. Bảo lưu mọi quyền.</p>
      </div>
    </div>
  );
};

export default Footer;