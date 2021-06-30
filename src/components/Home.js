import React from "react";
import { useData } from "../context";
import SingleList from "./singleList";

function Home() {
  const { CompanyData } = useData();
  return (
    <div style={{ marginTop: "80px", overflow: "hidden" }}>
      {CompanyData.map((company) => (
        <SingleList key={company._id} data={company} />
      ))}
    </div>
  );
}

export default Home;
