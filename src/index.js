import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Options from './App';
// import SignIn from './LoginPage'
import SignIn2 from './LoginPage2'
import TestDiv from './Test'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, withRouter, Switch} from 'react-router-dom'


const App = () => (
    <MuiThemeProvider>
        <Router>
            <div>
                <Route exact path="/" component={SignIn2} />
                <Route exact path="/options" component={Options} />
            </div>
        </Router>
    </MuiThemeProvider>
);

// const App = () => (
//     <MuiThemeProvider>
//         <TestDiv/>
//     </MuiThemeProvider>
// );



ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();




// <Route path="/home_page" component={SignIn} />