import { useAuth, useUser } from "@clerk/clerk-react";
import { useAppDispatch } from "../app/hooks";
import { addToCart, addToCartDB, updateQuantity, updateQuantityDB, removeFromCart, removeFromCartDB } from "../feature/cart/cartSlice";
import { addToWishlist, addToWishlistDB, removeFromWishlist, removeFromWishlistDB, toggleWishlist } from "../feature/wishlist/wishlistSlice";
import { Product } from "../types/product";

export const usePersistence = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const dispatch = useAppDispatch();

    const handleAddToCart = async (product: Product) => {
        if (product.stock <= 0) {
            window.alert("This product is out of stock.");
            return;
        }

        if (user) {
            const token = await getToken();
            if (token) {
                return dispatch(addToCartDB({ product, token }));
            }
        } else {
            return dispatch(addToCart(product));
        }
    };

    const handleUpdateCartQuantity = async (id: string, quantity: number, dbId?: string) => {
        // ALWAYS dispatch local update immediately for a snappy UI
        dispatch(updateQuantity({ id, quantity }));

        if (user && dbId) {
            const token = await getToken();
            if (token) {
                return dispatch(updateQuantityDB({ id: dbId, token, quantity }));
            }
        }
    };

    const handleRemoveFromCart = async (id: string, dbId?: string) => {
        // ALWAYS dispatch local removal immediately for a snappy UI
        dispatch(removeFromCart(id));

        if (user && dbId) {
            const token = await getToken();
            if (token) {
                return dispatch(removeFromCartDB({ id: dbId, token }));
            }
        }
    };

    const handleAddToWishlist = async (product: Product) => {
        if (user) {
            const token = await getToken();
            if (token) {
                return dispatch(addToWishlistDB({ product, token }));
            }
        } else {
            return dispatch(addToWishlist(product));
        }
    };

    const handleRemoveFromWishlist = async (id: string, dbId?: string) => {
        if (user && dbId) {
            const token = await getToken();
            if (token) {
                return dispatch(removeFromWishlistDB({ id: dbId, token }));
            }
        } else {
            return dispatch(removeFromWishlist(id));
        }
    };

    const handleToggleWishlist = async (product: Product) => {
        // For simplicity, handle toggle locally if guest,
        // or through add/remove if logged in (toggle requires finding dbId)
        if (user) {
            const token = await getToken();
            if (token) {
                // This is a simplified version; real toggle might need more logic
                return dispatch(addToWishlistDB({ product, token }));
            }
        } else {
            return dispatch(toggleWishlist(product));
        }
    };

    return {
        handleAddToCart,
        handleUpdateCartQuantity,
        handleRemoveFromCart,
        handleAddToWishlist,
        handleRemoveFromWishlist,
        handleToggleWishlist,
    };
};
