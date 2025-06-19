import React from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='container p-5'>
      <div className='row text-center'>
        <div className="col ">
          <img src='media/Zerodha-image/homeHero.png' alt='hero-image' width={1100} className='mb-5' />
          <h1 className="mt-5">Invest in everything</h1>
          <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <Link to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero