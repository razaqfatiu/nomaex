import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import signIn from './Components/auth/signIn';
import signUp from './Components/auth/signup';
import Navbar from './Components/layout/Navbar';
import ProductUpload from './Components/Admin/ProductUpload';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/signin" component={signIn} />
            <Route path="/signup" component={signUp} />
            <Route path="/admin/product-upload" component={ProductUpload} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
