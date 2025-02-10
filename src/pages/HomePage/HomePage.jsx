import { useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import { PiSealWarningDuotone } from "react-icons/pi";

const HomePage = () => {
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const awaitWrapper = async () => {
      try {
        setLoading(true);
        const arrTrending = await fetchTrendingMovies();
        setMoviesTrending(arrTrending.results);
      } catch (error) {
        console.log("Error", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    awaitWrapper();
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>

      {loading && (
        <>
          <Loader />
          <p className={css.text}>Uploading data, please wait for....</p>
        </>
      )}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PiSealWarningDuotone
            style={{ fontSize: "24px", color: "#376e6f" }}
          />
          <p className={css.text}>
            Oops, something went wrong! Please try reloading this page!
          </p>
        </div>
      )}
      {moviesTrending.length > 0 && <MovieList arrMovies={moviesTrending} />}
    </div>
  );
};

export default HomePage;
