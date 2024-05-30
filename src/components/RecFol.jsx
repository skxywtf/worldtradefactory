import React from "react";
import Recently from "./Recently";
import Followed from "./Followed";

const RecFol = ({ recentStocks, followedStocks }) => {
  return (
    <div className="lg:flex h-full my-40 w-full">
      <Recently recentStocks={recentStocks} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Followed followedStocks={followedStocks} />
    </div>
  );
};

export default RecFol;
