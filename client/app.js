import React from 'react'
import SquareConnect from 'square-connect'
import {Navbar} from './components'
import Routes from './routes'


const defaultClient = SquareConnect.ApiClient.instance
const oauth2 = defaultClient.authentications['oauth2'];
const listLocations = SquareConnect.ListLocationsRequest;
const api = new SquareConnect.LocationsApi();


const App = () => {
  console.log("Square", SquareConnect, listLocations);
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
