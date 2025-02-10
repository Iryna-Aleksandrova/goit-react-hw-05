import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ getQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.text.value.trim();
    getQuery(inputValue);
    if (!inputValue) {
      toast("Please, write something...", {
        icon: "📝",
        style: {
          backgroundColor: "#da7b93",
          color: "#2e151b;",
          fontWeight: "500",
        },
      });
      return;
    }
    e.target.reset();
  };

  return (
    <div>
      <form className={css.wrapper} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
