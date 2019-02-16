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
import { Constants } from 'expo';
import { Searchbar } from 'react-native-paper';
import ElevatedView from 'react-native-elevated-view';

export default class HospitalScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Searchbar
                    style={{ marginTop: STATUSBAR_HEIGHT + 12, margin: 12 }}
                    placeholder="Search Clear Spend..."
                    icon="arrow-back"
                    onIconPress={()=> this.props.navigation.goBack()}
                />
                <ElevatedView elevation={3} style={{ marginHorizontal: 20, borderRadius: 12, top: -16 }}>
                    <Text style={{ textAlign: 'center', padding: 12, bottom: -2, fontSize: 16 }}>
                        {this.props.navigation.state.params.name}
                    </Text>
                </ElevatedView>

                <FlatList
                    data={this.props.navigation.state.params.categories}
                    ItemSeparatorComponent={()=><View style={{ height: 1, borderBottomWidth: 0.5, borderBottomColor: 'gray', width: '95%', alignSelf: 'center' }}></View>}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this.props.navigation.navigate('HospitalScreen', { hospital: item.id })}
                        >
                            <View style={{ flex: 1, padding: 16 }}>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{item}</Text>
                            </View>

                        </TouchableOpacity>
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
