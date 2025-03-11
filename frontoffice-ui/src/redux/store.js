import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage/session'
import { rootReducer } from "./reducers/reducer";
import { thunk } from "redux-thunk";


const persistConfig ={
    key : 'root',
    transforms: [
      encryptTransform({
        secretKey: 'my-super-secret-key',
      }),
    ],
    storage
  }

  const persistedReducer = persistReducer(persistConfig,rootReducer);

//   const store = configureStore({
//     reducer : persistedReducer,
//     middleware : [thunk],
//     // devTools : import.meta.env.VITE_WORKING_ENVIRONMENT === 'LOCAL'
//   })

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false, // Disabling serializable check for persist
    }).concat(thunk),
    // devTools: import.meta.env.VITE_WORKING_ENVIRONMENT === 'LOCAL'
  });
  
  const persistedStore = persistStore(store);
  
  
  export { store, persistedStore}