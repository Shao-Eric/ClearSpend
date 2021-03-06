import React from 'react';
import firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator'
import Cart from './context/CartContext'

export default class App extends React.Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyC_patX2dw8MZEAz-ODSI53ayySIHlqB2k",
      authDomain: "clear-spend-231908.firebaseapp.com",
      databaseURL: "https://clear-spend-231908.firebaseio.com",
      projectId: "clear-spend-231908",
      storageBucket: "clear-spend-231908.appspot.com",
      messagingSenderId: "558366512204"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Cart>
        <AppNavigator />
      </Cart>
    );
  }
}

