import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/auth/signIn';
import SignUp from './Components/auth/signup';
import Navbar from './Components/layout/Navbar';
import ProductUpload from './Components/Admin/ProductUpload';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/admin/product-upload" component={ProductUpload} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
