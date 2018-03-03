import React from 'react'
import SquareConnect from 'square-connect'
import {Navbar} from './components'
import Routes from './routes'

const defaultClient = SquareConnect.ApiClient.instance
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQUARE_SANDBOX_TOKEN;

var api = new SquareConnect.LocationsApi();

api.listLocations(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

const App = () => {
  console.log("Square", SquareConnect, defaultClient);
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
