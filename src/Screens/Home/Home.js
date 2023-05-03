import React from "react";
import { colors } from "../../Constants";
import "./HomeStyle.css";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Blur from "react-blur";
import { useAuth } from "../../Components/Auth/use-auth";
import Admin from "../Admin/Admin";

const Home = () => {
  const auth = useAuth();
  console.log("user", auth.user);
  
    return (
      (auth?.user?.email=="admin@taaslalegal.com")?
          <Admin />:
    (
      <>
      <Hero />
      <FeaturedServices />
      <About />
      <Skills />
      </>
      )
  );
};

const Hero = () => {
  return (
    <Blur img={require("../../img/law.jpg")} blurRadius={10} enableStyles>
      <section
        id="hero"
        className="d-flex align-items-center hero"
        style={{
          // backgroundImage: `url(${require("../../img/law.jpg")})`,
          backgroundSize: "contain",
          filter: `brightness(${10})`,
        }}
      >
        <div data-aos="zoom-out" data-aos-delay="100">
          <h1 className="title">
            Welcome to <span style={{ color: "#3474e6" }}>TAASLALEGAL</span>
          </h1>
          <h2
            className="subTitle"
            style={{ color: "GrayText", fontWeight: "bold" }}
          >
            Corperate Law firm <strong>.</strong> Intellectual Property Law firm
          </h2>
          {/*<div className="d-flex">
          <a href="#about" className="btn-get-started scrollto">Get Started</a>
        </div> */}
        </div>
      </section>
    </Blur>
  );
};

const FeaturedServices = () => {
  return (
    <section id="featured-services" className="featured-services">
      <div className="container" data-aos="fade-up"></div>
    </section>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="about section-bg"
      style={{ background: colors.secondary, padding: (0, 100) }}
    >
      <div className="container" data-aos="fade-up">
        <div
          className="section-title"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <h2>About</h2>
          <h3>
            The <span>COMPANY!</span>
          </h3>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="col-lg-6 img1"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img
              src={require("../../img/img1.jpg")}
              style={{ width: 400, height: 400, marginRight: 100 }}
              className="img-fluid"
              alt=""
            />
          </div>
          <div
            className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <p>
              <p>About The Company</p>
              Taasla Legal is an innovative multi-disciplinary, legal practice
              and consultancy Firm, focused on providing legal and consulting
              services to clients around the world. We deal with the provision
              of legal services and consultation in all areas of law. Our
              mission is to help Individual, businesses, company, organizations
              etc owners in protecting their intellectual property rights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return <ProgressBar />;
};
export default Home;
