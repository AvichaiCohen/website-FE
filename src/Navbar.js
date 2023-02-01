import { Link, useMatch, useResolvedPath } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <HomeIcon></HomeIcon>
      </Link>
      <ul>
        <CustomLink to="/login">
          <LoginIcon></LoginIcon>
        </CustomLink>
        <CustomLink to="/cart">
          <ShoppingCartIcon></ShoppingCartIcon>
        </CustomLink>
        <CustomLink to="/favorites">
          <FavoriteIcon></FavoriteIcon>
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
