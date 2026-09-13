import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import StackNavigator from './src/navigation/StackNavigator';

import { UserProvider } from './src/context/UserContext';

import { store } from './src/redux/store';


function App() {
  return (
    <Provider store={store}>
      <UserProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}

export default App;