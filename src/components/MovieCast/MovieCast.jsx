import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import { PiSealWarningDuotone } from "react-icons/pi";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { id } = useParams();
  const [castMovie, setCastMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toPoster = "https://image.tmdb.org/t/p/w500/";

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const awaitWrapper = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCredits(id);
        setCastMovie(data.cast);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    awaitWrapper();
  }, [id]);

  return (
    <div>
      {loading && (
        <>
          <Loader />
          <p className={css.text}>Uploading data, please wait for....</p>
        </>
      )}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PiSealWarningDuotone
            style={{ fontSize: "24px", color: "#da7b93" }}
          />
          <p className={css.text}>
            Oops, something went wrong! Please try reloading this page!
          </p>
        </div>
      )}
      <ul className={css.card}>
        {castMovie.map((item) => (
          <li className={css.item} key={item.id}>
            <img
              src={
                item.profile_path
                  ? `${toPoster}${item.profile_path}`
                  : defaultImg
              }
              alt={item.name}
            />
            <h3 className={css.title}>{item.name}</h3>
            <p className={css.text}>Character: {item.character} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
