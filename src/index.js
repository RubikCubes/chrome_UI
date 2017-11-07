import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = () => (
  <MuiThemeProvider>
    <Form />
  </MuiThemeProvider>
);



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
