import "./logo.css";

// Import the website logo image
import logo from "/images/logo.png";

// Import Link component to navigate between pages without reloading
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="logo" to={"/"}>
      <img src={logo} />
    </Link>
  );
};

export default Logo;
