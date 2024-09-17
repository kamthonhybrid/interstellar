// import { round } from 'lodash'
// import { url } from '../constants/external_url'
// var CryptoJS = require('crypto-js')



// export const utilsFunc = {

//   withoutProperty(obj: any, property: string) {
//     const { [property]: unused, ...rest } = obj
//     return rest
//   },

//   sumArr(arr: (any | null)[]) {
//     return round(
//       arr.reduce((a, b) => {
//         return a! + b!
//       })!,
//       2
//     )
//   },

//   delay(time: number) {
//     return new Promise(resolve => setTimeout(resolve, time));
//   },

//   getSign(timestamp:string) {
//     var dataencode = url.alpha_private_key + timestamp
//     return CryptoJS.SHA512(dataencode).toString(CryptoJS.enc.Hex)
//   }
// }