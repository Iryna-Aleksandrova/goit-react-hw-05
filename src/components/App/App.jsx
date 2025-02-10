import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";
const Navigation = lazy(() => import("../Navigation/Navigation"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense
        fallback={
          <div>
            <Loader />
            <p style={{ fontSize: "24px", color: "#da7b93" }}>
              Loading page...
            </p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />}>
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="cast" element={<MovieCast />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
