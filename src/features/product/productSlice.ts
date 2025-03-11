import {  createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithAuth } from "../../services/authenServices";

interface Product {
    _id: string;
    name: string;
  
    price: number;
    category: string;
    images: string[];
    createdAt: string;
  }
interface ProductState {
    productsSearch: Product[];
    loading: boolean;
    error: string | null;
    totalPage: number;
    queryString: string
    
  }
  const initialState: ProductState = {
    productsSearch: [],
    loading: false,
    error: null,
    totalPage: 1,
    queryString: ''
  };
  
  // Async thunk để lấy danh sách sản phẩm
  export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async ({query, page, limit, category, sortBy }: {query:string; page: number; limit: number; category?: string; sortBy?: string }) => {
      const url = new URL("https://e-web-backend.onrender.com/products/search");
      url.searchParams.append("query", query);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", limit.toString());
      if (category) url.searchParams.append("category", category);
      if (sortBy) url.searchParams.append("sortBy", sortBy);
  
      const response = await fetchWithAuth(url.toString());
      if (!response.ok) throw new Error("Lỗi khi lấy danh sách sản phẩm");
      return response.json();
    }
  );
  export const setQuery = createAction<string>('product/setquery')
  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.productsSearch = action.payload.products;
          state.totalPage = action.payload.totalPages
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Lỗi khi lấy danh sách sản phẩm";
        })
        .addCase(setQuery, (state, action) => {
            state.queryString = action.payload
        })
    },
  });
  
  export default productSlice.reducer;



