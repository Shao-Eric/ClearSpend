import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';

import firebase from 'firebase';
import { Constants } from 'expo';
import { Searchbar } from 'react-native-paper';
import ElevatedView from 'react-native-elevated-view'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { MapView } from 'expo';
import { CartContext } from '../context/CartContext';

export default class HomeScreen extends React.Component {

  state = { "hospitals": [] }

  componentDidMount() {
    console.disableYellowBox = true;
    firebase.database().ref("hospitals").on('value', (snapshot) => {
      let hospitalsObj = snapshot.val()
      let hospitalsList = Object.keys(hospitalsObj).map(key => {
        let item = hospitalsObj[key]
        item['starArray'] = []
        for (let i = 0; i < item.stars; i++) {
          item['starArray'].push(
            <MaterialIcons name="star" size={24} color="#CA0D09" />
          )
        }
        return item
      })
      this.setState({ "hospitals": hospitalsList })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View elevation={3} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: STATUSBAR_HEIGHT + 12, marginHorizontal: 12 }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SearchScreen')}
            style={{ flex: 1 }}
          >
            <View pointerEvents="none">

              <Searchbar
                placeholder="Search ClearSpend..."
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ position: 'absolute' }}
            onPress={() => this.props.navigation.navigate('CartScreen')}
          >
            <CartContext.Consumer>
              {cartContext =>
                <MaterialCommunityIcons name={cartContext.listOfItems.length === 0 ? "cart-outline" : "cart"} size={26} color="#666666" style={{ padding: 12, marginLeft: 4 }} />
              }
            </CartContext.Consumer>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.hospitals}
          renderItem={({ item }) =>
            <ElevatedView
              elevation={3}
              style={styles.stayElevated}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() =>
                  this.props.navigation.navigate('HospitalScreen', {
                    hospitalId: item.id,
                    name: item.name,
                    categories: item.categories
                  })
                }
              >
                <View style={{ flex: 1, height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, padding: 16 }}>
                    <Text style={{ fontSize: 20 }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                      {item.starArray}
                    </View>
                    <Text style={{ fontSize: 14, marginVertical: 6 }}>{item.phone}</Text>
                    <Text style={{ fontSize: 14 }}>{item.address1}</Text>
                    <Text style={{ fontSize: 14 }}>{item.address2}</Text>

                  </View>
                  <View pointerEvents="none" style={{ flex: 1 }}>
                    <MapView
                      style={{ width: '100%', flex: 1, height: '100%' }}
                      region={{
                        latitude: item.lat,
                        longitude: item.lon,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                      }}
                      showsMyLocationButton={false}
                      showsUserLocation
                      toolbarEnabled={false}
                      zoomEnabled={false}
                      rotateEnabled={false}
                      pitchEnabled={false}
                      provider="google"
                      showsCompass={false}
                      showsIndoors={false}
                      showsIndoorLevelPicker={false}
                      showsBuildings={false}
                    >
                      <MapView.Marker
                        coordinate={{ latitude: item.lat, longitude: item.lon }}
                        pinColor="red"
                      />
                    </MapView>
                  </View>
                </View>
              </TouchableOpacity>
            </ElevatedView>
          }
        />
      </View>
    );
  }


}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stayElevated: {
    margin: 10,
    backgroundColor: 'white'
  },

});
