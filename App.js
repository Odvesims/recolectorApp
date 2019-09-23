import React, {Component} from 'react';
import {Root} from 'native-base';
import Navigation from './src/navigations/';

class App extends Component {
  render() {
    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}
export default App;
