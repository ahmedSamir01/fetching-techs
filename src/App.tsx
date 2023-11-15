import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SuperheroesPage from "./pages/Superheroes";
import HomePage from "./pages/Home";
import RCSuperheroesPage from "./pages/RCSuperheroes";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperheroesPage />} />
          <Route path="/rq-super-heroes" element={<RCSuperheroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
