import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Components/Auth/use-auth";
import "./style.css";

function Dashboard() {
  const auth = useAuth();
  return (
    <>
      <header className="header">
        <div className="container">
          <div>
            <h1>WELCOME!</h1>
            <p>
              <br />
              <a href="#">
                <i className="fas fa-file-alt" style={{ fontSize: "50px" }}></i>
              </a>{" "}
              <h2>
                <a href="#"> View Documents</a>
              </h2>
            </p>
          </div>
          <div
            style={{
              //   justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src={require("../../../img/me.jpg")} alt="#" />
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
              <a href="BRform.html">BUSINESS NAME REGISTRATION</a>
            </p>
          </div>
          <div className="box">
            <h2>
              <i className="fas fa-arrows-alt"></i>Request NEW
            </h2>
            <p>
              <a href="CRform.html">COMPANY NAME REGISTRATION</a>
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
              <i className="fas fa-mobile"></i>Generate
            </h2>
            <p>
              <a href="#">LEGAL DOCUMENTS</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
