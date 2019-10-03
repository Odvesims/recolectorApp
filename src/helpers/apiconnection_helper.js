import React from 'react';
import {Platform} from 'react-native';
import {NetInfo} from '@react-native-community/netinfo';

export function checkConnectivity() {
  // For Android devices
  if (Platform.OS === 'android') {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        return true;
      } else {
        return false;
      }
    });
  }
}

export async function getUserLogin(apiHost, apiPort, userName, userPassword) {
  let returnObject = {};
  let getUrl =
    'https://' +
    apiHost +
    ':' +
    apiPort +
    '/apimobile?apiOption=' +
    'GET_LOGIN' +
    '&username=' +
    userName +
    '&password=' +
    userPassword;
  try {
    let response = await fetch(getUrl, {method: 'GET'});
    const responseJson = await response.json();
    if (JSON.stringify(responseJson) == '{}') {
      returnObject = {
        valid: false,
        responseError: 'ALERT_BLANK_RESPONSE',
      };
    } else {
      if (responseJson.response != 'valid') {
        returnObject = {
          valid: false,
          responseError: responseJson.error_message,
        };
      } else {
        returnObject = {
          valid: true,
          displayName: responseJson.name,
          userRole: responseJson.user_data.employee_cat_label,
          user_data: responseJson.user_data,
          token: responseJson.token,
        };
      }
    }
  } catch (error) {
    returnObject = {
      valid: false,
      responseError: error.message(),
    };
  }
  return returnObject;
}

export async function getClients() {
  let returnObject = {};
  if (!global.apiHost) {
    global.apiHost = 'apimobile.sojaca.net';
    global.apiPort = 444;
  }
  let getUrl =
    'https://' +
    global.apiHost +
    ':' +
    global.apiPort +
    '/apimobile?apiOption=GET_CLIENTS&token=' +
    global.token;
  try {
    let response = await fetch(getUrl, {method: 'GET'});
    const responseJson = await response.json();
    if (JSON.stringify(responseJson) === '{}') {
      returnObject = {valid: false, response: 'ALERT_BLANK_RESPONSE'};
    } else {
      if (responseJson.response !== 'valid') {
        returnObject = {valid: false, response: responseJson.error_message};
      } else {
        returnObject = {
          valid: true,
          arrClients: responseJson.arr_clients,
        };
      }
    }
  } catch (error) {
    returnObject = {
      valid: false,
      responseError: error.message,
    };
  }
  return returnObject;
}

export async function clientOperation(clientData) {
  let returnObject = {};
  if (!global.apiHost) {
    global.apiHost = 'apimobile.sojaca.net';
    global.apiPort = 444;
  }
  let getUrl =
    'https://' +
    global.apiHost +
    ':' +
    global.apiPort +
    '/apimobile?apiOption=CLIENT_OPERATION&token=' +
    global.token +
    '&client_data=' +
    clientData;
  try {
    let response = await fetch(getUrl, {method: 'GET'});
    const responseJson = await response.json();
    if (JSON.stringify(responseJson) === '{}') {
      returnObject = {valid: false, response: 'ALERT_BLANK_RESPONSE'};
    } else {
      if (responseJson.response !== 'valid') {
        returnObject = {valid: false, response: responseJson.error_message};
      } else {
        returnObject = {
          valid: true,
          arrClients: responseJson.arr_clients,
        };
      }
    }
  } catch (error) {
    returnObject = {
      valid: false,
      responseError: error.message,
    };
  }
  return returnObject;
}

export async function getRoutes(routes_status) {
  let returnObject = {};
  if (!global.apiHost) {
    global.apiHost = 'apimobile.sojaca.net';
    global.apiPort = 444;
  }
  let getUrl =
    'https://' +
    global.apiHost +
    ':' +
    global.apiPort +
    '/apimobile?apiOption=GET_ACTIVE_ROUTES&token=' +
    global.token +
    '&routes_status=' +
    routes_status;
  try {
    let response = await fetch(getUrl, {method: 'GET'});
    const responseJson = await response.json();
    if (JSON.stringify(responseJson) === '{}') {
      returnObject = {valid: false, response: 'ALERT_BLANK_RESPONSE'};
    } else {
      if (responseJson.response !== 'valid') {
        returnObject = {valid: false, response: responseJson.error_message};
      } else {
        returnObject = {
          valid: true,
          arrRoutes: responseJson.arr_routes,
        };
      }
    }
  } catch (error) {
    returnObject = {
      valid: false,
      responseError: error.message,
    };
  }
  return returnObject;
}
