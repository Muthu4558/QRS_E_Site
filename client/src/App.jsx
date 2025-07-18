import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import PrivateRoute from "./components/PrivateRoute"; // Reuse this

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
      </Routes>
    </Router>
  );
};

export default App;