import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Components/Auth/use-auth";
import { FiFile } from "react-icons/fi";
import "./style.css";

function Dashboard() {
  const auth = useAuth();
  return (
    <>
      <header className="header">
        <div className="container">
          <div>
            <h1>WELCOME!</h1>
            <div className="icon-text-container">
              <FiFile className="icon" size={40} />
              {/* Additional JSX content */}

              <h1 className="text">
                <Link
                  to="/TaaslaLegal/client/documents"
                  style={{ fontSize: "30px" }}
                >
                  {" "}
                  View Documents
                </Link>
              </h1>
            </div>
          </div>
          <div
            style={{
              //   justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/*<img src={require("../../../img/me.jpg")} alt="#" />*/}
            <Link to={"/TaaslaLegal/client/profile"} id="userName">
              {auth.user.displayName}{" "}
            </Link>
          </div>
        </div>
      </header>

      <section className="boxes">
        <div className="container">
          <div className="box">
            <h2>
              <i className="fas fa-arrows-alt-v"></i> Request NEW
            </h2>
            <p>
              <Link to={"/TaaslaLegal/client/brform"}>
                BUSINESS NAME REGISTRATION
              </Link>
            </p>
          </div>
          <div className="box">
            <h2>
              <i className="fas fa-arrows-alt"></i>Request NEW
            </h2>
            <p>
              <Link to={"/TaaslaLegal/client/crform"}>
                COMPANY NAME REGISTRATION
              </Link>
            </p>
          </div>

          <div className="box">
            <h2>
              <i className="fas fa-mobile"></i>Request NEW
            </h2>
            <p>
              <a href="#">INCORPORATED TRUSTEE</a>
            </p>
          </div>
          <div className="box">
            <h2>
              <i className="fas fa-mobile"></i>Request for
            </h2>
            <p>
              <a href="#">LEGAL DOCUMENTS Generation</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
