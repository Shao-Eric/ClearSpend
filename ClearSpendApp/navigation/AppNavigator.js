import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import HospitalScreen from '../screens/HospitalScreen';

export default AppNavigator = createAppContainer(createStackNavigator({
  HomeScreen: {
    screen: SearchScreen
  },
  CategoryScreen: {
    screen: CategoryScreen
  },
  SearchScreen: {
    screen: SearchScreen
  },
  HospitalScreen: {
    screen: HospitalScreen
  }
}, {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
  }));
