import React, {Component} from 'react';

import './src/translations/i18n';
import NavigatorApp from './src/navigations/';

let roles = `super, recolector, admin`;

global.database_version = 32;
global.config_from = 'Login';
global.fromLogin = true;
global.userDisplayName = '';
global.userRole = '';
global.userName = '';
global.userPassword = '';
global.usesPrinter = 0;
global.printer_address = '';
global.printer_name = '';
global.apiHost = '';
global.apiPort = '';
global.token = '';
global.country_id = 0;
global.setma_id = 0;
global.employee_code = 0;
global.states_collection = {};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return <NavigatorApp />;
  }
}
export default App;
