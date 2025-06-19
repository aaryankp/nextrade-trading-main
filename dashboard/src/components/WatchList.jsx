import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";
import { Link } from "react-router-dom";

// ✅ Singleton socket connection
const socket = io("https://nex-trade-backend.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
});

const WatchList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // ✅ Socket error handler (optional but helpful)
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // ✅ Listen for real-time updates
    socket.on("realTimeUpdates", (data) => {
      if (data?.watchlist) {
        setStocks(data.watchlist);
      }
    });

    // ✅ Clean up listener (don't kill socket globally!)
    return () => {
      socket.off("realTimeUpdates");
    };
  }, []);

  const labels = stocks.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: stocks.map((stock) => stock.price || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {stocks.length} / 50</span>
      </div>

      <ul className="list">
        {stocks.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      
      <div className="item gap-2">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo gap-2">
          <span className="price">
            {typeof stock.price === "number"
              ? `$${stock.price.toFixed(2)}`
              : "--"}
          </span>
          <span className="percent gap-4">{stock.percentChange}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
        </div>
        <div className="additionalInfo">
          {/* <p className="open" >Open: ${stock.open}</p> */}
          <p className="high">High: ${stock.high}</p>
          <p className="low">Low: ${stock.low}</p>
          <p className="close" >Prev Close: ${stock.previousClose}</p>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => generalContext.openBuyWindow(uid);
  const handleSellClick = () => generalContext.openSellWindow(uid);

  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={handleBuyClick}>
          Buy
        </button>
      </Tooltip>

      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="sell" onClick={handleSellClick}>
          Sell
        </button>
      </Tooltip>

      <Tooltip
        title="Analytics (A)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <Link to={`/analytics/${uid}`} className="action">
          <BarChartOutlined className="icon" />
        </Link>
      </Tooltip>
    </span>
  );
};
