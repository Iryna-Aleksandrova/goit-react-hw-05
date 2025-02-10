import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import clsx from "clsx";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import { PiSealWarningDuotone } from "react-icons/pi";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movieItem, setMovieItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const goBackUrl = useRef(location?.state ?? "/movies");
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  const toPoster = "https://image.tmdb.org/t/p/w500/";
  useEffect(() => {
    const awaitWrapper = async () => {
      try {
        setLoading(true);
        const item = await fetchMovieDetails(`${id}`);
        setMovieItem(item);
        setGenres(item.genres);
      } catch (error) {
        console.log("Error", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    awaitWrapper();
  }, [id]);
  if (!movieItem) {
    return;
  }
  return (
    <div>
      <div className={css.linkBack}>
        <Link to={goBackUrl.current} className={css.goBack}>
          <PiArrowCircleLeftDuotone />
          Go back
        </Link>
      </div>

      {loading && (
        <>
          <Loader />
          <p style={{ fontSize: "24px", color: "#da7b93" }}>
            Uploading data, please wait for....
          </p>
        </>
      )}
      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#da7b93",
          }}
        >
          <PiSealWarningDuotone
            style={{ fontSize: "24px", color: "#376e6f" }}
          />
          <p style={{ fontSize: "24px", color: "#da7b93" }}>
            Oops, something went wrong! Please try reloading this page!
          </p>
        </div>
      )}
      <div className={css.wrapper}>
        <img
          src={
            movieItem.poster_path
              ? `${toPoster}${movieItem.poster_path}`
              : defaultImg
          }
          alt={movieItem.tagline}
          width="200"
          height="330"
        />
        <div>
          <h2 className={css.title}>{movieItem.title}</h2>
          <p>User Score: {`${movieItem.vote_average * 10}%`}</p>
          <h3 className={css.subtitle}>Overview</h3>
          <p>{movieItem.overview}</p>
          <h3 className={css.subtitle}>Genres</h3>
          <ul className={css.genres}>
            {genres.map(({ id, name }) => {
              return <li key={id}>{name}</li>;
            })}
          </ul>
        </div>
      </div>
      <h3 className={css.additional}>Additional information</h3>

      <nav className={css.nav}>
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
