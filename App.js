import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/Store';
import MainTab from './src/navigators/MainTab';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainTab />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

