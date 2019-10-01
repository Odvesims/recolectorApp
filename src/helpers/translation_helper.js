import {Alert} from 'react-native';

export function getTranslation(language, message) {
  let translatedString = '';
  switch (language) {
    case 'es':
      switch (message) {
        case 'ALERT_CONNECTION':
          translatedString =
            'La conexión con el servidor no pudo realizarse. Compruebe su conectividad e intente de nuevo.';
          break;
        case 'ALERT_AUTHENTICATE':
          translatedString = 'Falló la autenticación del usuario/contraseña.';
          break;
        case 'ALERT_USER_BLANK':
          translatedString = 'Usuario no puede estar en blanco.';
          break;
        case 'ALERT_PASSWORD_BLANK':
          translatedString = 'Contraseña no puede estar en blanco.';
          break;
        case 'MESSAGE_SIGNIN':
          translatedString = 'Iniciando Sesión';
          break;
        case 'MESSAGE_LOADING_CLIENTS':
          translatedString = 'Cargando Clientes';
          break;
        case 'TITLE_USER':
          translatedString = 'Usuario';
          break;
        case 'TITLE_PASSWORD':
          translatedString = 'Contraseña';
          break;
        case 'TITLE_SIGNIN':
          translatedString = 'Iniciar Sesión';
          break;
        case 'TITLE_CONFIGURATION':
          translatedString = 'Configuración';
          break;
        case 'TITLE_DOMAIN':
          translatedString = 'Dominio';
          break;
        case 'TITLE_PORT':
          translatedString = 'Puerto';
          break;
        case 'TITLE_USES_PRINTER':
          translatedString = 'Usa Printer?';
          break;
        case 'TITLE_PRINCIPAL':
          translatedString = 'Principal';
          break;
        case 'TITLE_CLIENTS':
          translatedString = 'Clientes';
          break;
        case 'TITLE_ROUTES':
          translatedString = 'Rutas';
          break;
        case 'ALERT_SYNC_INCOMPLETE':
          translatedString = 'Algunos de los datos no pudieron ser cargados.';
          break;
        case 'ALERT_DOMAIN_BLANK':
          translatedString = 'El Dominio no puede estar en blanco.';
          break;
        case 'ALERT_PORT_BLANK':
          translatedString = 'El Puerto no puede estar en blanco.';
          break;
        case 'ALERT_BLANK_RESPONSE':
          translatedString =
            'Respuesta en blanco. Por favor, revise la estructura de su petición.';
          break;
        case 'TITLE_YES':
          translatedString = 'Si';
          break;
        case 'TITLE_NO':
          translatedString = 'No';
          break;
        case 'TITLE_SAVE':
          translatedString = 'Guardar';
          break;
        case 'ALERT_REGISTER_SUCCESFUL':
          translatedString = 'Datos guardados satisfactoriamente.';
          break;
        case 'ALERT_REGISTER_FAILED':
          translatedString = 'Error al guardar los datos.';
          break;
        case 'ALERT_UPDATE_SUCCESFUL':
          translatedString = 'Datos actualizados satisfactoriamente.';
          break;
        case 'ALERT_UPDATE_FAILED':
          translatedString = 'Error al actualizar los datos.';
          break;
        default:
          translatedString = 'Traducción indefinida.';
          break;
      }
      break;
    case 'en':
      switch (message) {
        case 'ALERT_CONNECTION':
          translatedString =
            'Connection was not succesful. Please check your connection status and try again.';
          break;
        case 'ALERT_AUTHENTICATE':
          translatedString = 'User/password authentication failed.';
          break;
        case 'ALERT_USER_BLANK':
          translatedString = "Username can't be blank.";
          break;
        case 'ALERT_PASSWORD_BLANK':
          translatedString = "Password can't be blank.";
          break;
        case 'MESSAGE_SIGNIN':
          translatedString = 'Signing In';
          break;
        case 'MESSAGE_LOADING_CLIENTS':
          translatedString = 'Loading Clients';
          break;
        case 'TITLE_USER':
          translatedString = 'Username';
          break;
        case 'TITLE_PASSWORD':
          translatedString = 'Password';
          break;
        case 'TITLE_SIGNIN':
          translatedString = 'Sign In';
          break;
        case 'TITLE_CONFIGURATION':
          translatedString = 'Configuration';
          break;
        case 'TITLE_DOMAIN':
          translatedString = 'Hostname';
          break;
        case 'TITLE_PORT':
          translatedString = 'Port Number';
          break;
        case 'TITLE_USES_PRINTER':
          translatedString = 'Uses Printer?';
          break;
        case 'TITLE_PRINCIPAL':
          translatedString = 'Home';
          break;
        case 'TITLE_CLIENTS':
          translatedString = 'Clients';
          break;
        case 'TITLE_ROUTES':
          translatedString = 'Routes';
          break;
        case 'ALERT_SYNC_INCOMPLETE':
          translatedString = 'Some of the data could not be synchronized.';
          break;
        case 'ALERT_DOMAIN_BLANK':
          translatedString = "Hostname can't be blank.";
          break;
        case 'ALERT_PORT_BLANK':
          translatedString = "Port Number can't be blank";
          break;
        case 'ALERT_BLANK_RESPONSE':
          translatedString =
            'Empty response. Please check your fetch structure.';
          break;
        case 'TITLE_YES':
          translatedString = 'Yes';
          break;
        case 'TITLE_NO':
          translatedString = 'No';
          break;
        case 'TITLE_SAVE':
          translatedString = 'Save';
          break;
        case 'ALERT_REGISTER_SUCCESFUL':
          translatedString = 'Data succesfully saved.';
          break;
        case 'ALERT_REGISTER_FAILED':
          translatedString = 'Data storing failed.';
          break;
        case 'ALERT_UPDATE_SUCCESFUL':
          translatedString = 'Data succesfully updated.';
          break;
        case 'ALERT_UPDATE_FAILED':
          translatedString = 'Data updating failed.';
          break;
        default:
          translatedString = 'Undefined translation.';
          break;
      }
      break;
    case 'fr':
      switch (message) {
        case 'ALERT_CONNECTION':
          translatedString =
            "Connection n'a pas réussi. Veuillez vérifier l'état de votre connexion et réessayer.";
          break;
        case 'ALERT_AUTHENTICATE':
          translatedString =
            "L'authentification utilisateur/mot de passe a échoué.";
          break;
        case 'ALERT_USER_BLANK':
          translatedString = "L'utilisateur ne peut pas être vide.";
          break;
        case 'ALERT_PASSWORD_BLANK':
          translatedString = 'Le mot de passe ne peut pas être vide.';
          break;
        case 'MESSAGE_SIGNIN':
          translatedString = 'Se Connecter';
          break;
        case 'MESSAGE_LOADING_CLIENTS':
          translatedString = 'Chargement des clients';
          break;
        case 'TITLE_USER':
          translatedString = 'User';
          break;
        case 'TITLE_PASSWORD':
          translatedString = 'Mot de passe';
          break;
        case 'TITLE_SIGNIN':
          translatedString = 'Connecter';
          break;
        case 'TITLE_CONFIGURATION':
          translatedString = 'Configuration';
          break;
        case 'TITLE_DOMAIN':
          translatedString = 'Domaine';
          break;
        case 'TITLE_PORT':
          translatedString = 'Port';
          break;
        case 'TITLE_USES_PRINTER':
          translatedString = 'Utiliser une imprimante?';
          break;
        case 'TITLE_PRINCIPAL':
          translatedString = 'Principale';
          break;
        case 'TITLE_CLIENTS':
          translatedString = 'Les Clients';
          break;
        case 'TITLE_ROUTES':
          translatedString = 'itinéraires';
          break;
        case 'ALERT_SYNC_INCOMPLETE':
          translatedString = "Certaines données n'ont pas pu être chargées.";
          break;
        case 'ALERT_DOMAIN_BLANK':
          translatedString = 'Le domaine ne peut pas être vide.';
          break;
        case 'ALERT_PORT_BLANK':
          translatedString = "Port Number can't be blank";
          break;
        case 'ALERT_BLANK_RESPONSE':
          translatedString =
            "Réponse vide. S'il vous plaît vérifier votre structure de chercher.";
          break;
        case 'TITLE_YES':
          translatedString = 'Oui';
          break;
        case 'TITLE_NO':
          translatedString = 'No';
          break;
        case 'TITLE_SAVE':
          translatedString = 'Sauvegarder';
          break;
        case 'ALERT_REGISTER_SUCCESFUL':
          translatedString = 'Données sauvegardées avec succès.';
          break;
        case 'ALERT_REGISTER_FAILED':
          translatedString = "Erreur lors de l'enregistrement des données.";
          break;
        case 'ALERT_UPDATE_SUCCESFUL':
          translatedString = 'Données mises à jour avec succès.';
          break;
        case 'ALERT_UPDATE_FAILED':
          translatedString = 'Erreur de mise à jour des données.';
          break;
        default:
          translatedString = 'Traduction non définie.';
          break;
      }
      break;
  }
  return translatedString;
}
