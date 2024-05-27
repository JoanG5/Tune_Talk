import React from "react";

function NotFound() {
  return (
    <div className="flex justify-center items-start h-screen mt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <p className="text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
