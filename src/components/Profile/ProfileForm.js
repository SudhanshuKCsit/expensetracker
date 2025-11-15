import { useRef, useContext, useEffect } from "react";
import AuthContext from "../../Store/AuthContext";
import classes from "./ProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.token) return;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLDHqDhhBjTgnQiQmoGodN60pYzDDAvus",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: authCtx.token }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.users) return;
        const userData = data.users[0];

        fullNameInputRef.current.value = userData.displayName || "";
        profileUrlInputRef.current.value = userData.photoUrl || "";
      });
  }, [authCtx.token]);

  const cancelHandler = () => {
    navigate("/");
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoURL = profileUrlInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLDHqDhhBjTgnQiQmoGodN60pYzDDAvus",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl: enteredPhotoURL,
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile Updated:", data);
      })
      .catch((error) => console.error(error));

    fullNameInputRef.current.value = "";
    profileUrlInputRef.current.value = "";
  };

  return (
    <div>
      <form className={classes.form} onSubmit={updateProfileHandler}>
        <div className={classes.control}>
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" ref={fullNameInputRef} required />
        </div>

        <div className={classes.control}>
          <label htmlFor="photo-url">Profile Photo URL</label>
          <input type="text" id="photo-url" ref={profileUrlInputRef} required />
        </div>

        <div className={classes.action}>
          <button type="submit" className={classes.update}>
            Update
          </button>
          <button
            type="button"
            onClick={cancelHandler}
            className={classes.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
