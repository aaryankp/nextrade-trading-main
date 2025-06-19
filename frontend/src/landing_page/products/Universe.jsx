import React from 'react'
import { Link } from 'react-router-dom'

const Universe = () => {
  return (
    <div className="container mt-5">
    <div className="row text-center">
      <h1>The NexTrade Universe</h1>
      <p>
        Extend your trading and investment experience even further with our
        partner platforms
      </p>

      <div className="col-4 p-3 mt-5">
        <img src="media/Zerodha-image/smallcaseLogo.png" />
        <p className="text-small text-muted">Thematic investment platform</p>
      </div>
      <div className="col-4 p-3 mt-5">
        <img src="media/Zerodha-image/smallcaseLogo.png" />
        <p className="text-small text-muted">Thematic investment platform</p>
      </div>
      <div className="col-4 p-3 mt-5">
        <img src="media/Zerodha-image/smallcaseLogo.png" />
        <p className="text-small text-muted">Thematic investment platform</p>
      </div>
      <div className="col-4 p-3 mt-5">
        <img src="media/Zerodha-image/smallcaseLogo.png" />
        <p className="text-small text-muted">Thematic investment platform</p>
      </div>
      <div className="col-4 p-3 mt-5">
        <img src="media/Zerodha-image/smallcaseLogo.png" />
        <p className="text-small text-muted">Thematic investment platform</p>
      </div>
      <div className="col-4 p-3 mt-5">
        <img src="media/Zerodha-image/smallcaseLogo.png" />
        <p className="text-small text-muted">Thematic investment platform</p>
      </div>
      <Link to="/signup"
        className="p-2 btn btn-primary fs-5 mb-5"
        style={{ width: "20%", margin: "0 auto" }}
      >
        Signup Now
      </Link>
    </div>
  </div>
  )
}

export default Universe