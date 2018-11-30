using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Local.Storage.RNLocalStorage
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNLocalStorageModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNLocalStorageModule"/>.
        /// </summary>
        internal RNLocalStorageModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNLocalStorage";
            }
        }
    }
}
