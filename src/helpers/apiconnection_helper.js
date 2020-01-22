import axios from 'axios';
import {Platform} from 'react-native';

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
    console.log('getUrl ==>', getUrl);

    let andris = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('andris ==>', andris);
    let andrisJson = andris.data;
    console.log('andrisJson ==>', andrisJson);

    let response = await axios.get(getUrl);
    console.log('response ==>', response);
    let responseJson = response.data;
    console.log('responseJson ==>', responseJson);
    // let responseJson = await response.json();
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
    console.log(error);
    returnObject = {
      valid: false,
      responseError: error.message(),
    };
  }
  return returnObject;
}

export async function getData(apiOption, extraParams) {
  if (extraParams === undefined) {
    extraParams = '';
  }
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
    `/apimobile?apiOption=${apiOption}&token=` +
    global.token +
    '&setma_id=' +
    global.setma_id +
    '&employee_code=' +
    global.employee_code +
    '&country_id=' +
    global.country_id +
    '&username=' +
    global.userName +
    extraParams;
  try {
    console.log('getUrl ==>', getUrl);
    let response = await fetch(getUrl, {method: 'GET'});
    const responseJson = await response.json();
    console.log('Response ==>', responseJson);
    if (JSON.stringify(responseJson) === '{}') {
      returnObject = {
        valid: false,
        response: 'ALERT_BLANK_RESPONSE',
        arrResponse: [],
      };
    } else {
      if (responseJson.response !== 'valid') {
        returnObject = {
          valid: false,
          response: responseJson.error_message,
          arrResponse: [],
        };
      } else {
        returnObject = {
          valid: true,
          response: responseJson.error_message,
          arrResponse: responseJson.arr_response,
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

export async function dataOperation(apiOption, theData) {
  let returnObject = {};
  if (!global.apiHost) {
    global.apiHost = 'apimobile.sojaca.net';
    global.apiPort = 444;
  }
  let getUrl =
    'https://' + global.apiHost + ':' + global.apiPort + '/apimobile?';
  try {
    let response = await fetch(getUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiOption: apiOption,
        token: global.token,
        operationData: theData,
        username: global.userName,
      }),
    });
    const responseJson = await response.json();
    if (JSON.stringify(responseJson) === '{}') {
      returnObject = {valid: false, response: 'ALERT_BLANK_RESPONSE'};
    } else {
      if (responseJson.response !== 'valid') {
        returnObject = {valid: false, response: responseJson.error_message};
      } else {
        returnObject = {
          valid: true,
          responseObject: responseJson.response_object,
          message: responseJson.error_message,
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
