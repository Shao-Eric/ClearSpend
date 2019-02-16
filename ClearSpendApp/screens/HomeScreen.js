import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList
} from 'react-native';

import firebase from 'firebase';
import { Constants } from 'expo';
import { Searchbar } from 'react-native-paper';
import ElevatedView from 'react-native-elevated-view'

export default class HomeScreen extends React.Component {

  state = { "hospitals": [] }

  componentDidMount() {
    firebase.database().ref("hospitals").on('value', (snapshot) => {
      let hospitalsObj = snapshot.val()
      let hospitalsList = Object.keys(hospitalsObj).map(key => hospitalsObj[key])
      this.setState({ "hospitals": hospitalsList })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Searchbar
          style={{ marginTop: STATUSBAR_HEIGHT, marginHorizontal: 8, marginBottom: 30 }}
          placeholder="Search Clear Spend..."
        />


        <FlatList data={this.state.hospitals}
          renderItem={({ item }) =>
            <ElevatedView
              elevation={3}
              style={styles.stayElevated}
            >
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
                  <Text>Stars Placeholder</Text>
                  <Text>{item.address}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Image placeholder</Text>
                </View>
              </View>
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
