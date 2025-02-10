import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ arrMovies }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {arrMovies.map((movie) => (
          <li key={movie.id}>
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={location}
            >
              <h3 className={css.movie}>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
