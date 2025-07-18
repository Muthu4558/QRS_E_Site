import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import PrivateRoute from "./components/PrivateRoute"; // Reuse this
import Clothing from "./page/Clothing";
import Electronics from "./page/Electronics";
import Accessories from "./page/Accessories";
import Admin from "./page/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
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
        <Route path="/products/clothing" element={<Clothing />} />
        <Route path="/products/electronics" element={<Electronics />} />
        <Route path="/products/accessories" element={<Accessories />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </Router>
  );
};

export default App;