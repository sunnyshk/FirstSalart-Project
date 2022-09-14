import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="error-img" />
        <h3>Ohh! Page Not Found.</h3>
        <p>Seems Like the page you visited dose not exist!</p>
        <Link to="/">Back to home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
