import React, { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user) {
      const request = axios.post("http://localhost:3000/user", user);
      request
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div className="text-3xl font-bold underline">Home</div>
    </>
  );
}

export default Home;
