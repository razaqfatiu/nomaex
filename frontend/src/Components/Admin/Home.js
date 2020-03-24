import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import slide1 from '../../images/Backgrounds/dirt-road-through-the-fields.jpg'
import slide2 from '../../images/Backgrounds/market-peppers.jpg'
import slide3 from '../../images/Backgrounds/sheep-talking.jpg'
import './Home.scss'

class Home extends Component {
  render() {
    return (
      <div className="carousel slide" data-ride="carousel" id="slides">
        <ul className="carousel-indicators">
          <li data-target="#slides" data-slide-to="0" className="active"> </li>
          <li data-target="#slides" data-slide-to="1"> </li>
          <li data-target="#slides" data-slide-to="2"> </li>

        </ul>
        <div className="carousel-inner">
          <div className="carousel-item active" >
            <img src={slide1} />
            <div className="carousel-caption">
              <h1 className="display-2">Nomaex Admin center</h1>
              <h3>Buy your farm products directly</h3>
              <button type="button" className="btn btn-success btn-lg"  >Go Sign in</button>
            </div>
          </div>
            <div className="carousel-item">
              <img src={slide2} />
            <div className="carousel-caption">
              <h1 className="display-2">Nomaex Admin center</h1>
              <h3>Buy your farm products directly</h3>
              <Link to="/admin/" type="button" className="btn btn-success btn-lg">Go Sign in</Link>
            </div>
            </div>
            <div className="carousel-item">
              <img src={slide3} />
            </div>
          

        </div>
      </div>
    )
  }
}
export default Home