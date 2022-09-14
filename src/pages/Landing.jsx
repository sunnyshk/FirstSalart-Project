import {Logo} from "../components";
import mainLogo from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
// import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> App
          </h1>
          <p>
            Reach 250 Million job seekers with a job posting on FirstSalary. Get
            started today! Find Employees On The World's #1 Job Site. Reach 250
            Million Job Seekers! Reach 250M Job Seekers. Post Job. Hire Local
            Talent. Post a Job in Minutes. Number 1 Job Site.
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={mainLogo} alt="jsmain" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
