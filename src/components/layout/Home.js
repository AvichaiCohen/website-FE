import React, { useContext, useEffect, useState } from "react";
import AuthContext, { AuthProvider } from "../context/AuthProvider";
import { testAuthenticatedApi } from "../../services/api";
import ItemList from "../../pages/ItemList";
import Avatar from "./Avatar";
import { usernamelog } from "../registration/Login";

function Home() {
  const authContext = useContext(AuthContext);
  const [testResponse, setTestResponse] = useState();

  useEffect(() => {
    if (Object.keys(authContext["auth"]).length > 0) {
      testAuthenticatedApi({
        Authorization: "Bearer " + authContext["auth"],
      }).then((res) => {
        setTestResponse(res.data.response);
      });
    }
  }, [authContext]);

  return (
    <>
      <div>
        <Avatar username={usernamelog}></Avatar>
      </div>
      <ItemList></ItemList>
      {Object.keys(authContext["auth"]).length > 0 && <p>{testResponse}</p>}
    </>
  );
}

export default Home;
