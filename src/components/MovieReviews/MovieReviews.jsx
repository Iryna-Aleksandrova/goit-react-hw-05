import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import { TfiFaceSad } from "react-icons/tfi";
import { PiSealWarningDuotone } from "react-icons/pi";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const awaitWrapper = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(id);
        setReviews(data.results);
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
          <p style={{ fontSize: "24px", color: "#da7b93" }}>
            Uploading data, please wait for....
          </p>
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
      <ul>
        {reviews.length > 0 ? (
          reviews.map(({ author, content, id }) => (
            <li key={id}>
              <h2 className={css.title}>Author: {author}</h2>
              <p className={css.text}>{content}</p>
            </li>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#da7b93",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                color: "#da7b93",
                paddingLeft: "28px",
              }}
            >
              Sorry, we have no reviews on this film yet...
            </p>
            <TfiFaceSad
              style={{
                fontSize: "24px",
                color: "#376e6f",
              }}
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
