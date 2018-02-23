
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 import App from './App';
import registerServiceWorker from './registerServiceWorker';
//  import { BrowserRouter, Route, Link } from 'react-router-dom';
 import { BrowserRouter } from 'react-router-dom';
// import { AddEquityForm } from './components/AddEquityForm';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// const App2 = () => (
//   <div>
//     <nav>
//       <Link to="/addEquityForm">Add Equity</Link>
//     </nav>
//     <div>
//       <Route path="/addEquityForm" component={AddEquityForm}/>
//     </div>
//   </div>
// )

// const Dashboard = () => (
//   <div>
//     <h1>Hello from Dashboard</h1>
//   </div>
// )


ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
