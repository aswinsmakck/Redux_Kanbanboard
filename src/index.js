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
//https://api.unsplash.com/photos?page=2&per_page=15&client_id=MbMxmkTCMGwEY1GQGDl9Xlc4qwGH6himTTc0c0QdSSE
//localStorage.removeItem("state_kanbanboard")
//const boards = JSON.parse(localStorage.getItem("boards") || "[]");
const localStore = JSON.parse(localStorage.getItem("state_kanbanboard") || "{}");
console.log(localStore)
const preloadedState = localStore;

console.log("initial state for redux",preloadedState)
const store = createStore(rootReducer,preloadedState);
//const store = configureStore({reducer : rootReducer, preloadedState : initialState})
console.log(store)
console.log("initial state for redux", store.getState())

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
