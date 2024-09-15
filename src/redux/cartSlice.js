// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            // Tăng tổng số lượng sản phẩm
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    badgesNew: newItem.badgesNew,
                    price: newItem.price,
                    image: newItem.thumbnail_url,
                    authIcon: newItem.authIcon,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price,
                    name: newItem.name,
                    badgesNew_v2: newItem.badgesNew_v2,
                });
                state.totalQuantity++;
            } else {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice += newItem.price;
            }
            state.totalAmount += newItem.price; // Tăng tổng giá trị
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                state.totalQuantity -= 1; // Giảm tổng số lượng
                state.totalAmount -= existingItem.totalPrice; // Giảm tổng giá trị
                state.items = state.items.filter((item) => item.id !== id); // Xóa sản phẩm khỏi giỏ
            }
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                // Điều chỉnh tổng giá trị trước khi cập nhật
                state.totalAmount -= existingItem.totalPrice;

                // Cập nhật số lượng và giá trị tổng của sản phẩm
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity;

                // Cập nhật lại tổng giá trị
                state.totalAmount += existingItem.totalPrice;

                // Không thay đổi `totalQuantity` vì chỉ cập nhật số lượng của sản phẩm đã có
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
