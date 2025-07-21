import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleAuthError(error, showAlert = false) {
    if (error.response && error.response.status === 401) {
      if (showAlert) {
        toast.error("Please log in to add products to your cart.");
      }
      navigate("/login");
    }
  }

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/cart`, {
        credentials: "include",
      });
      if (res.status === 401) {
        handleAuthError({ response: { status: 401 } });
        setCartItems([]);
        return;
      }
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      setCartItems([]);
      toast.error("Failed to fetch cart items.");
    }
    setLoading(false);
  };

  const addToCart = async (product) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      if (res.status === 401) {
        handleAuthError({ response: { status: 401 } }, true);
        return;
      }
      await fetchCart();
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Failed to add to cart.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) {
        handleAuthError({ response: { status: 401 } });
        return;
      }
      await fetchCart();
      toast.info("Item removed from cart.");
    } catch (err) {
      toast.error("Failed to remove item.");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.status === 401) {
        handleAuthError({ response: { status: 401 } });
        return;
      }
      await fetchCart();
      toast.success("Cart updated successfully.");
    } catch (err) {
      toast.error("Failed to update cart.");
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) {
        handleAuthError({ response: { status: 401 } });
        return;
      }
      await fetchCart();
      toast.info("Cart cleared.");
    } catch (err) {
      toast.error("Failed to clear cart.");
    }
  };

    const checkoutCart = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/cart/checkout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 401) {
      handleAuthError({ response: { status: 401 } });
      return;
    }
    await fetchCart();
    toast.success("Checkout successful!");
    navigate("/thankyou"); // optional: create Thank You page
  } catch (err) {
    toast.error("Checkout failed.");
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkoutCart,
        loading,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}