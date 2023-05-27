import { useState } from "react";
import { BiEnvelope, BiPhone, BiListOl } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/use-auth";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();
  const signout = () => {
    auth.signout();
  };
  return (
    <>
      <section
        id="topbar"
        className="d-flex align-items-center"
        style={{ background: "#a1c3ff" }}
      >
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div
            className="contact-info d-flex align-items-center"
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-evenly",
              padding: 10,
            }}
          >
            <div style={{ alignItems: "center", display: "flex" }}>
              <BiEnvelope
                className="bi d-flex align-items-center"
                size={20}
                style={{ marginRight: 10 }}
              />
              Email:
              <a href="mailto:taaslalegal@gmail.com">taaslalegal@gmail.com</a>
            </div>
            <div style={{ alignItems: "center", display: "flex" }}>
              <BiPhone
                className="bi d-flex align-items-center ms-4"
                size={20}
                style={{ marginRight: 10 }}
              />
              Phone:
              <span>08035790088</span>
            </div>
            <div style={{ alignItems: "center", display: "flex" }}>
              <BsInstagram
                className="bi bi-instagram"
                size={20}
                style={{ marginRight: 10 }}
              />
              instagram:
              <a
                href="https://instagram.com/albasuamina?utm_medium=copy_link"
                target={"_blank"}
              >
                TaaslaLegal
              </a>
            </div>
          </div>
        </div>
      </section>
      <header style={{ backgroundColor: "#3474e6", width: "100%" }}>
        <div
          // className="container d-flex align-items-center justify-content-between"
          style={{
            justifyContent: "space-between",
            width: "100%",
            display: "flex",
            alignItems: "center",
            placeItems: "center",
          }}
        >
          <h1 className="logo">
            <Link to="/TaaslaLegal/home">TAASLALEGAL</Link>
          </h1>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <nav className="d-flex align-items-center navbar">
            <ul>
              <li>
                <Link
                  to={`/TaaslaLegal/${
                    auth.user
                      ? auth.user.email == "admin@taaslalegal.com"
                        ? "admin"
                        : "client"
                      : "home"
                  }`}
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li> */}
              <li>
                {!auth.user ? (
                  <Link to="/TaaslaLegal/login">Login/SignUp</Link>
                ) : (
                  <a
                    style={{
                      color: "darkred",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                    onClick={signout}
                  >
                    SignOut
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
