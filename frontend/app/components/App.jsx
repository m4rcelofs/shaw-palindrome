import React from 'react';

import {Grid} from 'react-bootstrap';
import PalindromeCheck from './PalindromeCheck.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <PalindromeCheck />
      </Grid>
    );
  }
}