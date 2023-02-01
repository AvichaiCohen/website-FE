import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { usernamelog } from "../components/registration/Login";
import "./User.css";
import AuthContext from "../components/context/AuthProvider";
export default function User() {
  const { setAuth } = useContext(AuthContext);
  const [items, setItems] = useState({});
  const usernameParams = { username: usernamelog };

  const deleteUser = () => {
    const deleteUserUrl = new URL(
      "http://localhost:8080/api/public/user/delete"
    );
    for (const key in usernameParams) {
      deleteUserUrl.searchParams.append(key, usernameParams[key]);
    }
    axios.delete(deleteUserUrl);
  };

  const handleSubmit = () => {
    const updateUserUrl = new URL(
      "http://localhost:8080/api/public/user/update"
    );
    for (const key in usernameParams) {
      updateUserUrl.searchParams.append(key, usernameParams[key]);
    }
    axios.put(updateUserUrl, newUserBody);
  };

  const getUserUrl = new URL("http://localhost:8080/api/public/user/get");
  for (const key in usernameParams) {
    getUserUrl.searchParams.append(key, usernameParams[key]);
  }
  const getApiData = () => {
    fetch(getUserUrl)
      .then((response) => response.json())
      .then((data) => setItems(data));
  };
  useEffect(() => {
    getApiData();
  }, []);

  const [firstNameChange, setFirstNameChange] = useState("");
  const [lastNameChange, setLastNameChange] = useState("");
  const [emailChange, setEmailChange] = useState("");
  const [phoneChange, setPhoneChange] = useState("");
  const [countryChange, setCountryChange] = useState("");
  const [cityChange, setCityChange] = useState("");
  const newUserBody = {
    firstName: firstNameChange,
    lastName: lastNameChange,
    email: emailChange,
    phone: phoneChange,
    country: countryChange,
    city: cityChange,
  };
  return (
    <>
      <div>
        <h1>User details page</h1>
        <form className="form_details">
          <label>First Name: </label>
          <input
            type="text"
            value={newUserBody.firstName}
            onChange={(e) => setFirstNameChange(e.target.value)}
          ></input>
          <label>Last Name: </label>
          <input
            type="text"
            value={newUserBody.lastName}
            onChange={(e) => setLastNameChange(e.target.value)}
          ></input>
          <label>Email: </label>
          <input
            type="text"
            value={newUserBody.email}
            onChange={(e) => setEmailChange(e.target.value)}
          ></input>
          <label>Phone: </label>
          <input
            type="text"
            value={newUserBody.phone}
            onChange={(e) => setPhoneChange(e.target.value)}
          ></input>
          <label>Country: </label>
          <input
            type="text"
            value={newUserBody.country}
            onChange={(e) => setCountryChange(e.target.value)}
          ></input>
          <label>City: </label>
          <input
            type="text"
            value={newUserBody.city}
            onChange={(e) => setCityChange(e.target.value)}
          ></input>
          <button onClick={handleSubmit()}>Change</button>
        </form>
        <button onClick={deleteUser()}>Delete</button>
      </div>
    </>
  );
}
