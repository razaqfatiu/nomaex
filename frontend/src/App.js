import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/auth/signIn';
import SignUp from './Components/auth/signup';
import NavBar from './Components/layout/Navbar';
import ProductUpload from './Components/Admin/ProductUpload';
import Home from './Components/Admin/Home'
import Homes from './Components/users/home'
import './App.scss'
import Footer from './Components/layout/footer';
import Animal from './Components/Categories/LiveStock';
import Fishery from './Components/Categories/Fishery';
import Poultry from './Components/Categories/Poultry';
import Fruit from './Components/Categories/Fruit';
import Checkout from './Components/users/Checkout';
import Contact from './Components/users/Contact';
import Product from './Components/Admin/Product';
import SideBar from './Components/layout/Sidebar';
import classNames from "classnames";
import { Container } from "react-bootstrap";
import Loading from './Components/layout/Loading';
import ProductDetails from './Components/Admin/ProductDetails';


class App extends Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true
    };

    this.previousWidth = -1;
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 988;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Container
            fluid
            // className={classNames("content", { "is-open": this.props.isOpen })}
          >
            <NavBar toggle={this.toggle} />

            <Switch>

              <Route exact path="/"> <Homes toggle={this.toggle} isOpen={this.state.isOpen} /> </Route>
              <Route path="/categories/animal" component={Animal} />
              <Route path="/categories/fishery" component={Fishery} />
              <Route path="/categories/fruit" component={Fruit} />
              <Route path="/categories/poultry" component={Poultry} />
              <Route path="/categories/checkout" component={Checkout} />
              <Route path="/categories/contact" component={Contact} />
              <Route path="/loading" component={Loading} />


              {/* <Route path="/admin" component={Home} /> */}
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              
              <Route path="/admin/product-upload" component={ProductUpload} />
              <Route path="/admin/products/all" component={Product} />
              <Route path='/admin/products/:id' component={ProductDetails} />
              

            </Switch>
            <Footer />

          </Container>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
