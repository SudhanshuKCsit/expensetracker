import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import classes from "./HomePage.module.css";
import ExpenseTracker from "../components/ExpenseTracker/ExpenseTracker";
import ExpenseImage from "../OutputImg/expensetracker1.png";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate("/profile");
  };

  return (
    <>
      {authCtx.isLoggedIn ? (
        <div>
          <section className={classes.starting}>
            <p>Welcome to Expense Tracker!!!</p>

            <div className={classes.profile}>
              <p>Your profile is incomplete.</p>
              <button onClick={profileHandler}>Complete Now</button>
            </div>
          </section>

          <ExpenseTracker />
        </div>
      ) : (
        <>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Welcome to Expense Tracker!!!
          </h1>

          <section className={classes.heroSection}>
            <div className={classes.heroContent}>
              <h1>Control Your Finances. Effortlessly.</h1>
              <p>
                With Expense Tracker you can track every rupee, visualize
                spending trends, export data, and unlock premium features —
                built with real-time databases and seamless dark/light theme
                support.
              </p>

              <div className={classes.ctaButtons}>
                <Link to="/auth">
                  <button className={classes.primaryBtn}>Get Started</button>
                </Link>
                <button className={classes.secondaryBtn}>Learn More</button>
              </div>
            </div>

            <div className={classes.heroVisual}>
              <img
                src={ExpenseImage}
                alt="Expense Tracker Dashboard"
                style={{
                  width: "375px",
                  height: "500px",
                  borderRadius: "14px",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                  objectFit: "cover",
                  marginTop: "20px",
                }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
