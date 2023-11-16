"use client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StravaAuthorization } from "./stravaAuthorization";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// const StravaAuthorization = dynamic(() => import("./stravaAuthorization"), {
//     loading: () => <p>loading...</p>,
//     ssr: false,
//   });

const App = () => {
  return (
    <div>
      <StravaAuthorization></StravaAuthorization>
    </div>
  );
};

export default App;
