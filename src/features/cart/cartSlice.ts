import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    seller: {
      _id: string;
      username: string;
      email: string;
    };
    images: string[];
    stock: number;
    ratings: {
      userId: string;
      rating: number;
      comment: string;
      createdAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
    quantity:number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { _id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.quantity += quantity;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        state.items.push(action.payload);
      }
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === _id);

      if (item) {
        item.quantity = quantity;
      }
    },
    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;