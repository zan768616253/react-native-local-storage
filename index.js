
import { NativeModules } from 'react-native';

const { RNLocalStorage } = NativeModules;

class LocalStorage {
    constructor () {
    }

    getItem( key ) {
        return new Promise((resolve, reject) => {
            RNLocalStorage.multiGet([key], function(errors, result) {
                // Unpack result to get value from [[key,value]]
                var value = (result && result[0] && result[0][1]) ? result[0][1] : null;
                var errs = convertErrors(errors);
                callback && callback(errs && errs[0], value);
                if (errs) {
                  reject(errs[0]);
                } else {
                  resolve(value);
                }
              })
        })
    }

    setItem( key, value) {
        return new Promise((resolve, reject) => {
            RNLocalStorage.multiSet([[key,value]], function(errors) {
                var errs = convertErrors(errors);
                callback && callback(errs && errs[0]);
                if (errs) {
                  reject(errs[0]);
                } else {
                  resolve(null);
                }
              })
        })
    }
}

export default new LocalStorage();
