import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
