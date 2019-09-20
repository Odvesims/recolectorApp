import {Alert} from 'react-native';

export function getTranslation(language, message) {
  let translatedString = '';
  switch (language) {
    case 'es':
      switch (message) {
        case 1:
          translatedString =
            'La conexión con el servidor no pudo realizarse. Compruebe su conectividad e intente de nuevo.';
          break;
        case 2:
          translatedString = 'Falló la autenticación del usuario/contraseña';
          break;
        case 3:
          translatedString = 'Iniciando Sesión';
          break;
        case 4:
          translatedString = 'Usuario';
          break;
        case 5:
          translatedString = 'Contraseña';
          break;
        case 6:
          translatedString = 'Iniciar Sesión';
          break;
        case 100:
          translatedString = 'Principal';
          break;
        case 999:
          translatedString =
            'Respuesta en blanco. Por favor, revise la estructura de su petición';
          break;
        default:
          translatedString = 'Traducción indefinida.';
          break;
      }
      break;
    case 'en':
      switch (message) {
        case 1:
          translatedString =
            'Connection was not succesful. Please check your connection status and try again.';
          break;
        case 2:
          translatedString = 'User/password authentication failed';
          break;
        case 3:
          translatedString = 'Signing In';
          break;
        case 4:
          translatedString = 'Username';
          break;
        case 5:
          translatedString = 'Password';
          break;
        case 6:
          translatedString = 'Sign In';
          break;
        case 100:
          translatedString = 'Home';
          break;
        case 999:
          translatedString =
            'Empty response. Please check your fetch structure.';
          break;
        default:
          translatedString = 'Undefined translation.';
          break;
      }
      break;
    case 'fr':
      switch (message) {
        case 1:
          translatedString =
            "Connection n'a pas réussi. Veuillez vérifier l'état de votre connexion et réessayer.";
          break;
        case 2:
          translatedString =
            "L'authentification utilisateur/mot de passe a échoué";
          break;
        case 3:
          translatedString = 'Se Connecter';
          break;
        case 4:
          translatedString = 'User';
          break;
        case 5:
          translatedString = 'Mot de passe';
          break;
        case 6:
          translatedString = 'Connecter';
          break;
        case 100:
          translatedString = 'Principale';
          break;
        case 999:
          translatedString =
            "Réponse vide. S'il vous plaît vérifier votre structure de chercher.";
          break;
        default:
          translatedString = 'Traduction non définie.';
          break;
      }
      break;
  }
  return translatedString;
}
