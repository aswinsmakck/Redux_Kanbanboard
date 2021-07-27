import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/fontawesome-free-5.15.3-web/css/all.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from  'react-router-dom';
import {Provider} from 'react-redux'
import rootReducer from './Reducers/rootReducer'
import {createStore} from 'redux'

//localStorage.removeItem("boards")
const boards = JSON.parse(localStorage.getItem("boards") || "[]");
console.log(boards)
const preloadedState = {boards}

console.log("initial state for redux",preloadedState)
const store = createStore(rootReducer,preloadedState);
//const store = configureStore({reducer : rootReducer, preloadedState : initialState})
console.log(store)
console.log(store.getState())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
