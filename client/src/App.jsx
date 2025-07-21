import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import Clothing from "./page/Clothing";
import Electronics from "./page/Electronics";
import Accessories from "./page/Accessories";
import Admin from "./page/Admin";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./page/ProductDetail";
import ThankYou from "./page/thankyou";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Protected Routes (User only) */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          {/* Public Product Routes */}
          <Route path="/products/clothing" element={<Clothing />} />
          <Route path="/products/electronics" element={<Electronics />} />
          <Route path="/products/accessories" element={<Accessories />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </CartProvider>
    </Router>

  );
};

export default App;