import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css';

// import './js/jquery.sticky';
// import 'js/popper.min.js';
// import 'js/bootstrap.min.js';
// import './js/owl.carousel.min.js';
// import './js/classynav.js';
// import './js/wow.min.js';
// import './js/jquery.sticky.js'
// import './js/jquery.magnific-popup.min.js';
// import './js/jquery.scrollup.min.js';
// import './js/jarallax.min.js';
// import 'js/jarallax-video.min.js';
// import 'js/active.js';
// import './style.css';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './Store/reducers/rootReducer';


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
