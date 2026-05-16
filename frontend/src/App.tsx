import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard"
import Activate from "./pages/Activate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
