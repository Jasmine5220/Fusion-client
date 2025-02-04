import React from "react";
import { Layout } from "../../components/layout";
// import { Route, Routes } from "react-router-dom";
import PatentRoutes from "./routes/PatentRoutes";

function Patent() {
  return (
    <Layout>
      <PatentRoutes />
    </Layout>
  );
}

export default Patent;
