import css from "./NotFoundPage.module..css";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <div className={css.div}>
      <TbError404 style={{ fontSize: "24px", color: "#da7b93" }} />
      <p>Not found 404</p>
    </div>
  );
};

export default NotFoundPage;
