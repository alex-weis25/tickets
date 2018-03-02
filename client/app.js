import React from "react";

import { Navbar } from "./components";
import Routes from "./routes";
import { StripeProvider, Elements } from "react-stripe-elements";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe("pk_test_hIw9csAxy5dtOikdK1WQUVXp")
      })
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe("pk_test_hIw9csAxy5dtOikdK1WQUVXp")});
      });
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
      <Elements>
      <div>
          <Navbar />
          <Routes />
        </div>
        </Elements>
      </StripeProvider>
    );
  }
}

export default App;
