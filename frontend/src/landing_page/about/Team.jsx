import React from 'react'

const Team = () => {
  return (
    <div className="container">
    <div className="row p-3 mt-5 border-top">
      <h1 className="text-center ">People</h1>
    </div>

    <div
      className="row p-3 text-muted"
      style={{ lineHeight: "1.8", fontSize: "1.2em" }}
    >
      <div className="col-6 p-3 text-center">
        <img
          src="media/Zerodha-image/TeamImage.jpeg"
          style={{ borderRadius: "100%", width: "50%" }}
        />
        <h4 className="mt-5">Knights of the Round Table</h4>
        <h6>Team </h6>
      </div>
      <div className="col-6 p-3">
        <p>
        Knights of the Round Table Team founded NexTrade in 2022 to overcome the
          hurdles he faced during his decade long stint as a trader. Today,
          NexTrade has changed the landscape of the Indian broking industry.
        </p>
        <p>
          He is a member of the SEBI Secondary Market Advisory Committee
          (SMAC) and the Market Data Advisory Committee (MDAC).
        </p>
        <p>Playing basketball is his zen.</p>
        <p>
          Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
          <a href="">Twitter</a>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Team