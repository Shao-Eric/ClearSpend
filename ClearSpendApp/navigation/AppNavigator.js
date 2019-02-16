import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import React from 'react'
export default AppNavigator = createAppContainer(createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  }
}));
