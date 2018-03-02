import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    console.log("Card Element", CardElement);
    return (
      <label>
        Card details
        <CardElement />
      </label>
    );
  }
}

export default CardSection;

// import React from 'react';
// import {CardElement} from 'react-stripe-elements';

// class CardSection extends React.Component {
//   render() {
//     return (
//       <label>
//         Card details
//         <CardElement style={{base: {fontSize: '18px'}}} />
//       </label>
//     );
//   }
// }

// export default CardSection;
