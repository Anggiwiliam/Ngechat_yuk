import React from 'react';


import Main from './src/Routes/Main';
import * as firebase from "firebase";


var firebaseConfig = {
    apiKey: "AIzaSyCXq9yQNIjfN2-hCugbqs891GDI3NB4h6s",
    authDomain: "chatapp-1ae1c.firebaseapp.com",
    databaseURL: "https://chatapp-1ae1c.firebaseio.com",
    projectId: "chatapp-1ae1c",
    storageBucket: "chatapp-1ae1c.appspot.com",
    messagingSenderId: "857021876456",
    appId: "1:857021876456:web:99d51238381c71efe7a15d",
    measurementId: "G-RV8N8X7H33"
  };
  
  firebase.initializeApp(firebaseConfig);

export default class Application extends React.Component {
  

  render() {
    return (
   
          <Main />
        
    );
  }
}
