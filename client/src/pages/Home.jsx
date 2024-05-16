import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {

  const { user, isAuthenticated } = useAuth0();
  console.log(isAuthenticated)

  return (
    <>
      <div className="text-3xl font-bold underline">Home</div>
    </>
  );
}

export default Home;
