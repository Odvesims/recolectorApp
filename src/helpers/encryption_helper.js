import RNCryptor from 'react-native-rncryptor';

const encryptionKey = "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F";

export function encryptData(data){
	let encrypted = ""
	RNCryptor.encrypt(data, encryptionKey).done((encryptedbase64)=>{ return encryptedbase64; });
}

export function decryptData(data){
	RNCryptor.decrypt(data.replace("=", "."), encryptionKey).then((plaintext)=>{
		return plaintext	
	}).catch((error)=>{
		return error;
	})
}