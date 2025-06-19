import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol = "AAPL" }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    // Clear any existing widget
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";
    }

    // Create the TradingView widget
    new window.TradingView.widget({
      container_id: chartContainerRef.current.id,
      symbol: symbol, // Stock symbol (e.g., AAPL, NSE:TCS)
      theme: "light", // Chart theme: "light" or "dark"
      locale: "en", // Language
      width: "100%",
      height: 500,
      interval: "D", // Time interval: "1", "5", "15", "D" (daily), etc.
      timezone: "Etc/UTC", // Set timezone
      style: "1", // Chart style: 1 = candlestick
      toolbar_bg: "#f1f3f6", // Toolbar background color
      enable_publishing: false,
      allow_symbol_change: true,
    });
  }, [symbol]);

  return <div id="tradingview-chart" ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />;
};

export default TradingViewChart;