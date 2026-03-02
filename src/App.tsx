import { useEffect, FC } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import Topbar from "./components/layout/Topbar";
import { API_BASE_URL } from "./config/api";

import { useUser, useAuth } from "@clerk/clerk-react";
import { useAppDispatch } from "./app/hooks";
import {
  fetchCart,
  switchIdentity as switchCartIdentity,
} from "./feature/cart/cartSlice";
import {
  fetchWishlist,
  switchIdentity as switchWishlistIdentity,
} from "./feature/wishlist/wishlistSlice";


const App: FC = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useAppDispatch();

  // 🔹 NEW — Sync guest data to DB on login
  const syncGuestData = async (token: string) => {
    const isSynced = sessionStorage.getItem(`guest_synced_${user?.id}`);
    if (isSynced || !user) return;

    try {
      // Sync Cart
      const guestCart = localStorage.getItem("cart_guest");
      if (guestCart) {
        const { items } = JSON.parse(guestCart);
        for (const item of items) {
          // Only sync if it's a valid MongoDB ObjectId (24 hex chars)
          if (/^[0-9a-fA-F]{24}$/.test(item.id)) {
            await fetch(`${API_BASE_URL}/api/cart`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productId: item.id,
                quantity: item.quantity,
              }),
            });
          } else {
            console.warn(
              `Skipping sync for mock product: ${item.name} (${item.id})`,
            );
          }
        }
        localStorage.removeItem("cart_guest");
      }

      // Sync Wishlist
      const guestWishlist = localStorage.getItem("wishlist_guest");
      if (guestWishlist) {
        const { items } = JSON.parse(guestWishlist);
        for (const item of items) {
          // Only sync if it's a valid MongoDB ObjectId
          if (/^[0-9a-fA-F]{24}$/.test(item.id)) {
            await fetch(`${API_BASE_URL}/api/wishlist`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ productId: item.id }),
            });
          } else {
            console.warn(
              `Skipping sync for mock wishlist product: ${item.name} (${item.id})`,
            );
          }
        }
        localStorage.removeItem("wishlist_guest");
      }

      sessionStorage.setItem(`guest_synced_${user.id}`, "true");
      // Refresh redux state
      dispatch(fetchCart(token));
      dispatch(fetchWishlist(token));
    } catch (error) {
      console.error("Guest Sync Error:", error);
    }
  };

  // 🔹 NEW — Save User to MongoDB
  const syncUser = async () => {
    if (!user) return;

    try {
      const token = await getToken();
      if (token) {
        await syncGuestData(token);
        dispatch(fetchCart(token));
        dispatch(fetchWishlist(token));
      }
    } catch (error) {
      console.error("Fetch Data Error:", error);
    }

    const isUserSynced = sessionStorage.getItem(`synced_${user.id}`);
    if (isUserSynced) return;

    try {
      const token = await getToken();

      const res = await fetch(`${API_BASE_URL}/sync-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User Sync Success:", data);
        sessionStorage.setItem(`synced_${user.id}`, "true");
      }
    } catch (error) {
      console.error("Sync Error:", error);
    }
  };

  useEffect(() => {
    const userId = user?.id || null;
    dispatch(switchCartIdentity(userId));
    dispatch(switchWishlistIdentity(userId));

    if (user) {
      syncUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);



  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <Navbar />

      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
};

export default App;
