import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../features/cart/cartSlice";
import { RootState } from "../../store/store";
import { useAuth } from "../AuthContext/AuthContext";
import checkoutServices from "../../services/OrdersServices.ts/checkoutServices";
import styles from './cart.module.css'; // Import CSS Module
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { getUser } = useAuth();
  const negative = useNavigate()
  const user = getUser();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (_id: string, quantity: number) => {
    dispatch(updateQuantity({ _id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (!user._id) {
      negative('/login')
      return
    }
    const orderData = {
      userId: user._id,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      paymentMethod: "cash",
      shippingAddress: user.profile?.address,
    };

    try {
      checkoutServices(orderData).then((res) => {
        return res.json();
      }).then((data) => {
        setPaymentStatus(data.message);
        if (data.success) {
          dispatch(clearCart());
        } else {
          alert("Có lỗi xảy ra khi thanh toán");
        }
      });
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Có lỗi xảy ra khi thanh toán");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p className={styles.cartEmptyMessage}>Giỏ hàng trống</p>
      ) : (
        <ul className={styles.cartItems}>
          {cartItems.map((item) => (
            <li key={item._id} className={styles.cartItem}>
              <img src={`https://e-web-backend.onrender.com/${item.images[0]}`} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemName}>{item.name}</h3>
                <p className={styles.cartItemPrice}>{item.price.toLocaleString()} VNĐ</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item._id, Number(e.target.value))}
                  min="1"
                  className={styles.cartItemInput}
                />
              </div>
              <button onClick={() => handleRemove(item._id)} className={styles.cartRemoveButton}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.cartActions}>
        <h3 className={styles.cartTotal}>Tổng cộng: {total.toLocaleString()} VNĐ</h3>
        <button onClick={handleClearCart} className={styles.cartClearButton}>
          Xóa giỏ hàng
        </button>
        <button onClick={handleCheckout} className={styles.cartCheckoutButton}>Thanh Toán</button>
        {paymentStatus && (
          <p className={`${styles.paymentStatus} ${paymentStatus === 'Thanh toán thành công!' ? styles.paymentSuccess : styles.paymentFailure}`}>
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
