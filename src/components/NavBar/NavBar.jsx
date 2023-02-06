import React, { useContext } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { NewContext } from "../../Context/Context";

const NavBar = () => {
  const { logout, isAuthenticated, user } = useContext(NewContext);

  const activeStyle = {
    color: "#598392",
  };

  return (
    <div className="nav-bar">
      <div className="logo">
        <img
          src="https://img.icons8.com/stickers/100/null/dashboard-layout.png"
          alt="logo"
        />
        <h3>Blog Admin Panel</h3>
      </div>
      {isAuthenticated ? (
        <div className="nav-elements">
          <div className="navbar-user">
            <img
              src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/FFFFFF/external-User-essential-collection-bearicons-glyph-bearicons.png"
              alt="user"
            />
            <span>{user.username}</span>
            <span>{user.email}</span>
          </div>
          <ul className="nav-links">
            <span className="nav-title">ADMIN</span>
            <li>
              <NavLink
                to="/admin/home"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <img
                  src="https://img.icons8.com/glyph-neue/64/FFFFFF/home-page.png"
                  alt="home-img"
                />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/notes"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/overview-pages-1.png"
                  alt="notes-img"
                />
                <span>My notes</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/edit-profile"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/edit-user-female.png"
                  alt="contact-img"
                />
                <span>My account</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" onClick={logout}>
                <img
                  src="https://img.icons8.com/external-dashed-line-kawalan-studio/24/FFFFFF/external-logout-shopping-e-commerce-dashed-line-kawalan-studio.png"
                  alt="logout-img"
                />
                <span>Log out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="nav-elements">
          <ul className="nav-links">
            <span className="nav-title">WELCOME</span>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/guest-male.png"
                  alt="login-img"
                />
                <span>Login</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sing-up"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <img
                  src="https://img.icons8.com/fluency-systems-filled/30/FFFFFF/plus-2-math.png"
                  alt="create-account-img"
                />
                <span>Create your account</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
