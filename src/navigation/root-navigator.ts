import { createAppContainer, createStackNavigator } from 'react-navigation';
import { TabNavigator } from './tab-navigator';

const MainNavigator = createStackNavigator({
  TabNavigator : {
    screen: TabNavigator
  }
},{
  headerMode: 'none'
});

export const RootNavigator = createAppContainer(MainNavigator);