import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classes from "./Navbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
function Navbar() {
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.siteTitle}>
        <HomeIcon></HomeIcon>
      </Link>
      <ul>
        <CustomLink to="/login">
          <LoginIcon></LoginIcon>
        </CustomLink>
        <CustomLink to="/signUp">
          <AppRegistrationSharpIcon></AppRegistrationSharpIcon>
        </CustomLink>
        <CustomLink to={"/cart"}>
          <ShoppingCartIcon></ShoppingCartIcon>
        </CustomLink>
        <CustomLink to={"/favorites"}>
          <FavoriteIcon></FavoriteIcon>
        </CustomLink>
      </ul>
    </nav>
  );
}

export function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? classes.active : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
