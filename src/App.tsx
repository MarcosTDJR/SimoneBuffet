import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import { ActivityProvider } from "./components/admin/context/ActivityContext";

export default function App() {
  return (
    <Router>
      <ActivityProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ActivityProvider>
    </Router>
  );
}