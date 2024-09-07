// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; // ajuste o caminho para o seu rootReducer
import rootSaga from './rootSagas'; // ajuste o caminho para o seu rootSaga

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      sagaMiddleware:true,
      thunk: false, // Desativa o thunk se você estiver usando o saga
      serializableCheck: false, // Opcional: pode ser necessário para algumas configurações
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
