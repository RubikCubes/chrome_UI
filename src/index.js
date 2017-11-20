import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './App';
import SignIn from './LoginPage'
import SignIn2 from './LoginPage2'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, withRouter, Switch} from 'react-router-dom'


const App = () => (
    <MuiThemeProvider>
        <Router>
            <div>
                <Route path="/login" component={SignIn2} />
                <Route path="/options" component={Form} />
            </div>
        </Router>
    </MuiThemeProvider>
);



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




// <Route path="/home_page" component={SignIn} />