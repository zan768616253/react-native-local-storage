
import { NativeModules } from 'react-native';

const { RNLocalStorage } = NativeModules;

class LocalStorage {
    constructor () {
    }

    getItem( key ) {
      const self = this
      return new Promise((resolve, reject) => {
          RNLocalStorage.multiGet([key], function(errors, result) {
              // Unpack result to get value from [[key,value]]
              var value = (result && result[0] && result[0][1]) ? result[0][1] : null;
              var errs = self.convertErrors(errors);
              if (errs) {
                reject(errs[0]);
              } else {
                resolve(value);
              }
            })
      })
    }

    setItem( key, value) {
      const self = this
      return new Promise((resolve, reject) => {
          RNLocalStorage.multiSet([[key,value]], function(errors) {
              var errs = self.convertErrors(errors);
              if (errs) {
                reject(errs[0]);
              } else {
                resolve(null);
              }
            })
      })
    }

    removeItem( key ) {
      return new Promise((resolve, reject) => {
        RCTAsyncStorage.multiRemove([key], function(errors) {
          var errs = convertErrors(errors);
          if (errs) {
            reject(errs[0]);
          } else {
            resolve(null);
          }
        });
      });
    }

    clear () {
      return new Promise((resolve, reject) => {
        RCTAsyncStorage.clear(function(error) {
          if (error && convertError(error)){
            reject(convertError(error));
          } else {
            resolve(null);
          }
        });
      });
    }

    convertErrors(errs) {
      if (!errs) {
        return null;
      }
      return (Array.isArray(errs) ? errs : [errs]).map((e) => convertError(e));
    }
    
    convertError(error) {
      if (!error) {
        return null;
      }
      var out = new Error(error.message);
      out.key = error.key; // flow doesn't like this :(
      return out;
    }
}

export default new LocalStorage();
