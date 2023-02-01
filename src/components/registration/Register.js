import React, { useRef, useState, useEffect, Fragment } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';
import classes from "./Register.module.css";
import { createNewUser } from "../../services/api";
import { Link } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // when component load we set the focus on the userInput top be on
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // every time the user state change we want to validate the user input with the regex
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // every time the password or the match password change we want to validate the password with the regex
  // and validate that the matched password is indeed match the password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // every time we change any input we don't want to show error massege
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const newUserBody = {
        username: user,
        password: pwd,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        country: country,
        city: city,
      };
      const response = await createNewUser(newUserBody);
      setSuccess(true);

      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setCity("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Fragment>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"}>Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? classes.errmsg : classes.offscreen}
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              // when user focus on the input we want to set the userFocus to true
              onFocus={() => setUserFocus(true)}
              // when user leave the input (blur) we want to set the userFocus to false
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd ? classes.instructions : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: <span>!</span>{" "}
              <span aria-label="at symbol">@</span> <span>#</span>{" "}
              <span>$</span> <span>%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validMatch && matchPwd ? classes.valid : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatch || !matchPwd ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <label>First Name:</label>
            <input
              type="text"
              id="firstname"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            ></input>
            <label>Last Name:</label>
            <input
              type="text"
              id="lastname"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>
            <label>Email:</label>
            <input
              type="text"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <label>Phone:</label>
            <input
              type="text"
              id="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            ></input>
            <label>Country:</label>
            <input
              type="text"
              id="country"
              required
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            ></input>
            <label>City:</label>
            <input
              type="text"
              id="city"
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
            ></input>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className={classes.line}>
              {/*put router link here*/}
              <Link to={"/login"}>Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </Fragment>
  );
};

export default Register;