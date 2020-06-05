import React, { Component } from 'react'
import './homes.scss'
import firstSlide from '../../images/Backgrounds/carrots-for-sale-at-market.jpg'
import secondSlide from '../../images/Backgrounds/market-peppers.jpg'
import thirdSlide from '../../images/Backgrounds/farm-land-hay-bails.jpg'
import cock from '../../images/Backgrounds/cock.jpg'
import cow from '../../images/Backgrounds/cow.jpg'
import { Link } from 'react-router-dom'



export default class Homes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [1, 2, 3, 4, 5]
    }
  }
  render() {
    return (
      <div className="main-ho">

        {/* Header Slides */}
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="first-slide" src={firstSlide} alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h2>NOMAEX Farm</h2>
                  <p>Buy the freshly Harvested Farm Products</p>
                  <p><Link to="/signup"><button type="button" className="btn btn-primary btn-lg" >Signup</button></Link></p>
                </div>

              </div>
            </div>
            <div className="carousel-item">
              <img className="second-slide" src={secondSlide} alt="Second slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h2>NOMAEX Farm</h2>
                  <p>NO. 1 Online farm products supplier in Nigeria</p>
                  <p><Link to="/signup"><button type="button" className="btn btn-primary btn-lg" >Signup</button></Link></p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <img className="d-block w-100" src={thirdSlide} alt="Third slide" />
              <div className="container">
                <div className="carousel-caption text-left">
                  <h2>NOMAEX Farm</h2>
                  <p>We have the best in stock for you.</p>
                  <p><Link to="/signup"><button type="button" className="btn btn-primary btn-lg" >Signup</button></Link></p>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>


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
