import { Dimensions, Platform, PixelRatio, Alert } from 'react-native';

export function getDataUsingGet(theOption, getUrl){
    fetch(getUrl, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(JSON.stringify(responseJson) == '{}'){
			responseJson.err_message = "Hostname/Port invalid";
			alert(responseJson.err_message)
		} else{
			if(responseJson.id == 12){
				alert("The Option: " + theOption);
				/*switch(theOption){
					validResponse(theOption, responseJson['dev']);
				}*/
			} else if(responseJson.id == 1){
				responseJson.err_message = "Usuario/Clave inválidos";
				alert(responseJson.err_message)
			}
			console.log(responseJson);
		}
    })
    .catch((error) => {
        console.error(error);
    });
	return false;
}
 
export function getDataUsingPost(){
    //POST json 
    var dataToSend = {title: 'foo', body: 'bar', userId: 1};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
		var encodedKey = encodeURIComponent(key);
		var encodedValue = encodeURIComponent(dataToSend[key]);
		formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('https://jsonplaceholder.typicode.com/posts', {
		method: "POST",//Request Type 
		body: formBody,//post body 
		headers: {//Header Defination 
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
    })
    .then((response) => response.json())
    .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
    })
    .catch((error) => {
		alert(JSON.stringify(error));
		console.error(error);
    });
}
