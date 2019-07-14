import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { TabNavigator } from './tab-navigator';
import { LoginScreen } from '../screens/login-screen';

const MainNavigator = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  TabNavigator : {
    screen: TabNavigator
  }
});

export const RootNavigator = createAppContainer(MainNavigator);