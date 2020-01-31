import React, {Component} from 'react';

import './src/translations/i18n';
import NavigatorApp from './src/navigations/';

let roles = `super, recolector, almacen`;

class App extends Component {
  render() {
    // console.log(this.props);
    return <NavigatorApp />;
  }
}
export default App;
