import React from "react";
import { useParams } from "react-router-dom";
import TradingViewChart from "./TradingViewChart";

const ExampleChart = () => {
  const { symbol } = useParams(); // Get the stock symbol from the URL

  return (
    <div>
      <h2>{symbol}</h2>
      {/* Pass the stock symbol to the TradingViewChart */}
      <TradingViewChart symbol={symbol} />
    </div>
  );
};

export default ExampleChart;