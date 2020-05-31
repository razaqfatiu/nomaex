import React, { Component } from 'react'
// import './home.scss'
// import firstSlide from '../../images/Backgrounds/carrots-for-sale-at-market.jpg'
// import secondSlide from '../../images/Backgrounds/market-peppers.jpg'
// import thirdSlide from '../../images/Backgrounds/farm-land-hay-bails.jpg'
import cock from '../../images/Backgrounds/cock.jpg'
import cow from '../../images/Backgrounds/cow.jpg'
import { Link } from 'react-router-dom'
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "../layout/Navbar";


export default class Homes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [1, 2, 3, 4, 5]
    }
  }
  render() {
    return (
      <div className="main-ho mt-5">
        

        {/* Header Slides */}
        

        {/* Featured Products Title */}

        <div className="container-fluid padding">
          <div className="row featured-title text-center">
            <div className="col-12">
              <h1>Featured Products</h1>
            </div>
          </div>
        </div>


        {/* Featured Products */}
        <div className="container padding">
          <div className="row featured-product padding">
            {this.state.products.map((product, index) => (<div className="col-md-4">
              {/* <h1>Featured Products</h1> */}
              {(index > 1) ? <div className="card">
                <img className="card-img-top" src={cock} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Test PRoduct Title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Shop</a>
                </div>
              </div> : <div className="card">
                  <img className="card-img-top" src={cow} alt="Card cap" />
                  <div className="card-body">
                    <h5 className="card-title">Test PRoduct Title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Shop</a>
                  </div>
                </div>}

              {/* <div className="card">
                <img className="card-img-top" src={cock} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">Test PRoduct Title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Shop</a>
                </div>
              </div> */}
            </div>))}
          </div>
        </div>

      </div>
    )
  }
}
