import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar__link" to="/">
        Dashboard
      </Link>
      <Link className="navbar__link" to="/registros">
        Ciudadanos
      </Link>
      <Link className="navbar__link" to="/tramites">
        Trámites
      </Link>
      {/* <DateDisplay /> */}
    </nav>
  );
};
