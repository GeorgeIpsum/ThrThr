// @ts-ignore bc we just need to import this but not use it
import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/home-screen';

export const TabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
});