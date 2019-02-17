import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import HospitalScreen from '../screens/HospitalScreen';
import CartScreen from "../screens/CartScreen";

const fade = (props) => {
  const { position, scene } = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.5, 1, 0.5]
  })

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  }
}

export default AppNavigator = createAppContainer(createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  CartScreen: {
    screen: CartScreen
  },
  SearchScreen: {
    screen: SearchScreen
  },
  HospitalScreen: {
    screen: HospitalScreen
  }
}, {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: (props) => {
        return fade(props)
      }
    })
  }));
