import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage.jsx';

ReactDOM.render( <MainPage />, document.getElementById('root') );
if(process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
