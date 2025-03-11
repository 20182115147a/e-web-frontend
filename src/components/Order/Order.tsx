// src/components/OrderHistory.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import styles from './order.module.css'; // Import the CSS module

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { getUser } = useAuth();
  const user = getUser();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user._id) {
        try {
          await fetch(`https://e-web-backend.onrender.com/orders/${user._id}`).then((res) => {
            return res.json();
          }).then((data) => {
            if (data.success) {
              setOrders(data.orders);
            }
            console.log(data);
          });
        } catch (error) {
          console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        }
      }
    };

    fetchOrders();
  }, [user._id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lịch Sử Đơn Hàng</h2>
      {orders.length === 0 ? (
        <p className={styles.noOrdersText}>Bạn chưa có đơn hàng nào</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} className={styles.orderItem}>
              <h3 className={styles.orderItemHeader}>Đơn Hàng #{order._id}</h3>
              <p className={styles.orderDetails}>Tổng Tiền: {order.totalAmount.toLocaleString()} VNĐ</p>
              <p className={styles.orderDetails}>Phương Thức Thanh Toán: {order.paymentMethod}</p>
              <p className={styles.orderDetails}>Trạng Thái: {order.status}</p>
              <ul className={styles.itemList}>
                {order.items.map((item: any) => (
                  <li key={item.productId._id} className={styles.item}>
                    <p className={styles.itemName}>Sản Phẩm: {item.productId.name}</p>
                    <p className={styles.itemQuantity}>Số Lượng: {item.quantity}</p>
                    <p className={styles.itemPrice}>Giá: {item.price.toLocaleString()} VNĐ</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
