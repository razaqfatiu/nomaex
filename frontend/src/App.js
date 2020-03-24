import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/auth/signIn';
import SignUp from './Components/auth/signup';
import Navbar from './Components/layout/Navbar';
import ProductUpload from './Components/Admin/ProductUpload';
import Home from './Components/Admin/Home'
import Homes from './Components/users/home'
import './App.scss'
import Footer from './Components/layout/footer';
import Animal from './Components/categories/Animal';
import Fishery from './Components/categories/Fishery';
import Poultry from './Components/categories/Poultry';
import Fruit from './Components/categories/Fruit';
import Checkout from './Components/users/Checkout';
import Contact from './Components/users/Contact';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>

            <Route exact path="/" component={Homes} />
            <Route exact path="/categories/animal" component={Animal} />
            <Route exact path="/categories/fishery" component={Fishery} />
            <Route exact path="/categories/fruit" component={Fruit} />
            <Route exact path="/categories/poultry" component={Poultry} />
            <Route exact path="/categories/checkout" component={Checkout} />
            <Route exact path="/categories/contact" component={Contact} />


            <Route path="/admin" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/admin/product-upload" component={ProductUpload} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
