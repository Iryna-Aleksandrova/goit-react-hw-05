import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchSearchMovie } from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { PiSealWarningDuotone } from "react-icons/pi";

const MoviesPage = () => {
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const getQuery = (searchedQuery) => {
    searchParams.set("query", searchedQuery);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const awaitWrapper = async () => {
      try {
        setLoading(true);
        const arrSearch = await fetchSearchMovie(query);
        setMoviesSearch(arrSearch.results);
      } catch (error) {
        console.log("Error", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    awaitWrapper();
  }, [query]);

  return (
    <div>
      <SearchBar getQuery={getQuery} query={query} />
      {loading && (
        <>
          <Loader />
          <p>Uploading data, please wait for....</p>
        </>
      )}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PiSealWarningDuotone
            style={{ fontSize: "24px", color: "#376e6f" }}
          />
          <p style={{ fontSize: "24px", color: "#da7b93" }}>
            Oops, something went wrong! Please try reloading this page!
          </p>
        </div>
      )}

      {moviesSearch.length > 0 && <MovieList arrMovies={moviesSearch} />}
    </div>
  );
};

export default MoviesPage;
