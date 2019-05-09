import React from 'react';
import './App.css';
import firebase from 'firebase';
import axios from "axios";
import { askForPermissioToReceiveNotifications } from './push-notification';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }
  componentDidMount() {
    
    window.addEventListener('load', this.handlePushNoti);
  }
  handlePushNoti = () => {
    const messaging = firebase.messaging();
    
      messaging.onMessage(function(payload) {
        console.log(payload);
         //TODO
    });
    }
  getUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      this.setState({
        user: json
      })
    })
  }
  click = async () => {
    const token = await askForPermissioToReceiveNotifications();
    axios.get('https://nodepushnotifirebase.herokuapp.com/pushnoti', {
      params: {
        token: token
      }
    })
    .then(function (response) {
      console.log(response);
    })
  }
  render() {
    const { user} = this.state;
    return (
      <div >
         <button onClick={this.click} >
          push notifications ...
        </button>
          <button onClick={this.getUser}>
            Get User
          </button>
          <div>
           <table  border="1">
             <thead>
               <tr>
                 <th>Id</th>
                 <th>name</th>
                 <th>username</th>
                 <th>email</th>
               </tr>
             </thead>
             <tbody>
               {user.map((item, index) => {
                 return(
                   <tr key={index}>
                     <td>{item.id}</td>  <td>{item.name}</td>  <td>{item.username}</td>  <td>{item.email}</td>
                   </tr>
                 )
               })
                 
               }
             </tbody>
           </table>

          </div>
      
      </div>
    );
  }
  
}

export default App;
