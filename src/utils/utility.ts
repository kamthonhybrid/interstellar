import ecs from '../constants/ecs.json'
import { tokenController } from '../controllers/token.controller';
import { datakey } from '../constants/conf';
var CryptoJS = require('crypto-js')



class Utils {
    async getEcsToken() {
        let headers = {
            'api_key': ecs.ecs_api_key,
            'Authorization': 'Bearer ' + await tokenController.getEcsToken()
        };

        return headers;
    }

    getSign(timestamp: string) {
        const crypto = require("crypto-js")

        var dataencode = datakey.private_key + timestamp

        console.log('timestamp : ', timestamp)

        // Encrypting the data using the password key
        console.log("Encrypted data -- ")
        const encrypted = crypto.AES.encrypt(timestamp, process.env.PRIVATE_KEY).toString();
        console.log(encrypted)


        // Decrypting the data using the same password key
        console.log("Decrypted data -- ")
        const decrypted = crypto.AES.decrypt(encrypted, process.env.PRIVATE_KEY).toString(crypto.enc.Utf8)
        if (decrypted == '') console.log("Cannot decode")
        console.log(decrypted)

        return encrypted
        // return CryptoJS.SHA512(dataencode).toString(CryptoJS.enc.Hex)

    }

    generatePassword(length : any, includeUppercase : any, includeNumbers : any, includeSymbols: any) {
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = includeUppercase ? lowercaseChars.toUpperCase() : "";
        const numbers = includeNumbers ? "0123456789" : "";
        const symbols = includeSymbols ? "!@#$%^" : "";
        const allChars = lowercaseChars + uppercaseChars + numbers + symbols;
      
        let password = "";
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * allChars.length);
          password += allChars.charAt(randomIndex);
        }
      
        return password;
      }

    genPassword() {
          // Example usage
          const passwordLength = 15;
          const includeUppercase = true;
          const includeNumbers = true;
          const includeSymbols = true;
          
          const password = this.generatePassword(passwordLength, includeUppercase, includeNumbers, includeSymbols);
          console.log(password);
          return password;
    }
    
}


export const utils = new Utils();