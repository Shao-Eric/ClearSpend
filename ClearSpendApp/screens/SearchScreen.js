import React from 'react'
import { View, StyleSheet, StatusBar, Platform, FlatList, Text, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Constants } from 'expo';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ElevatedView from 'react-native-elevated-view'
import { CartContext } from '../context/CartContext';

export default class SearchScreen extends React.Component {
    state = {
        data: [],
        firstQuery: ''
    }


    componentDidMount() {
        console.disableYellowBox = true;
        let searchQuery = { "query": this.state.firstQuery }
        if ('params' in this.props.navigation.state && this.props.navigation.state.params) {
            if ('hospitalId' in this.props.navigation.state.params) {
                searchQuery['hospital'] = this.props.navigation.state.params.hospitalId
            }
            if ('category' in this.props.navigation.state.params) {
                searchQuery['category'] = this.props.navigation.state.params.category
            }
        }

        fetch('https://clear-spend-231908.appspot.com/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchQuery)
        }).then((response) =>
            response.json()
        ).then(data =>
            this.setState({ data })
        )
    }

    onSubmitSearch = () => {
        this.setState({ data: [] })
        let searchQuery = { "query": this.state.firstQuery }
        if ('params' in this.props.navigation.state && this.props.navigation.state.params) {
            if ('hospitalId' in this.props.navigation.state.params) {
                searchQuery['hospital'] = this.props.navigation.state.params.hospitalId
            }
            if ('category' in this.props.navigation.state.params) {
                searchQuery['category'] = this.props.navigation.state.params.category
            }
        }
        fetch('https://clear-spend-231908.appspot.com/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchQuery)
        }).then((response) =>
            response.json()
        ).then(data => {
            if (data.length > 0) {
                this.setState({ data })
            }
        }
        )
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
                        style={{ flex: 1 }}
                    >

                        <Searchbar
                            autoFocus
                            placeholder="Search ClearSpend..."
                            icon="arrow-back"
                            onIconPress={() => this.props.navigation.goBack()}
                            onChangeText={query => { this.setState({ firstQuery: query }); }}
                            onSubmitEditing={(event) => this.onSubmitSearch()}
                        />
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

                {this.props.navigation.state.params && ('name' in this.props.navigation.state.params) && <ElevatedView elevation={2} style={{ marginHorizontal: 20, borderRadius: 12, top: -12, backgroundColor: 'skyblue' }}>
                    <Text style={{ textAlign: 'center', padding: 12, bottom: -2, fontSize: 16, color: 'white' }}>
                        {this.props.navigation.state.params.name}{"\n"}
                        {this.props.navigation.state.params.category}
                    </Text>
                </ElevatedView>}

                <FlatList
                    style={{ flex: 1, top: this.props.navigation.state.params && ('name' in this.props.navigation.state.params) ? -12 : 0, padding: 4 }}
                    removeClippedSubviews
                    data={this.state.data}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
                    renderItem={({ item }) => (
                        <View style={styles.cardStyle}>
                            <View style={styles.cardSectionStyle}>
                                <View style={styles.wrapContainer}>
                                    <Text style={{ fontSize: 15 }}>
                                        {item.Description}
                                    </Text>
                                    <Text style={{ fontSize: 12 }}>
                                        {item.hospital}
                                    </Text>
                                </View>
                                <View style={styles.headerContentStyle}>
                                    <Text style={{ fontSize: 14, textAlign: 'center', width: 80 }}>
                                        ${item.Price.toFixed(2)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                >
                                    <CartContext.Consumer>
                                        {cartContext =>
                                            <TouchableOpacity onPress={() => cartContext.addItem({
                                                description: item.Description,
                                                price: item.Price,
                                                hospital: item.hospital,
                                                date: new Date().getTime()
                                            })} style={styles.buttonStyle}>
                                                <AntDesign name="pluscircleo" size={26} color="green" />
                                            </TouchableOpacity>
                                        }
                                    </CartContext.Consumer>

                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.Price}

                />
            </View>



        )
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
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: 22
    },
    thumbnailStyle: {
        height: 80,
        width: 80
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 100,
        flex: 1
    },
    cardStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,

    },
    cardSectionStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        height: 100
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: 150
    }

});