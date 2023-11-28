import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SuperheroesPage from "./pages/Superheroes";
import HomePage from "./pages/Home";
import RCSuperheroesPage from "./pages/RCSuperheroes";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RQSuperHeroPage } from "./pages/RQSuperHero";
import { ParallelQueriesPage } from "./pages/ParallelQueries";
import { DynamicParallelQueries } from "./pages/DynamicParallelQueries";
import { DependentQueries } from "./pages/DependentQueries";
import { PaginatedQueriesPage } from "./pages/PaginatedQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
            <Route
              path="/dynamic-rq-parallel"
              element={<DynamicParallelQueries />}
            />
            <Route
              path="/dependent-rq"
              element={<DependentQueries email="vishwas@example.com" />}
            />
            <Route path="/rq-super-heroes" element={<RCSuperheroesPage />} />

            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
            {/* <Route path="/rq-infinite" element={<InfiniteQueriesPage />} /> */}

            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
