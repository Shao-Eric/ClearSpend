import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CategoryScreen';

export default AppNavigator = createAppContainer(createStackNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  CategoryScreen: {
    screen: CategoryScreen
  },
  SearchScreen: {
    screen: SearchScreen
  },
  CartScreen: {
    screen: CartScreen
  }
}, {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  }));
