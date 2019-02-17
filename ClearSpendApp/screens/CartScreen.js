import React from 'react'
import { View, FlatList, TouchableOpacity, Text, Platform, StatusBar, StyleSheet } from 'react-native'
import { CartContext } from '../context/CartContext';
import { Constants } from 'expo'
import { AntDesign } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default class CartScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, marginTop: STATUSBAR_HEIGHT }}>
                <StatusBar
                    animated
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={26} color="black" style={{ margin: 12 }} />
                </TouchableOpacity>
                <CartContext.Consumer>
                    {cartContext =>
                        <FlatList
                            style={{ flex: 1, paddingBottom: 16, padding: 8 }}
                            removeClippedSubviews
                            data={cartContext.listOfItems}
                            ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
                            ListEmptyComponent={() =>
                                <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>Your cart is empty!</Text>
                                </View>}
                            renderItem={({ item }) => (
                                <View style={styles.cardStyle}>
                                    <View style={styles.cardSectionStyle}>
                                        <View style={styles.wrapContainer}>
                                            <Text style={{ fontSize: 15 }}>
                                                {item.description}
                                            </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                {item.hospital}
                                            </Text>
                                        </View>
                                        <View style={{ ...styles.headerContentStyle }}>
                                            <Text style={{ fontSize: 14, textAlign: 'center', width: 80 }}>
                                                ${item.price.toFixed(2)}
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
                                                    <TouchableOpacity onPress={() => cartContext.removeItem(item)} style={styles.buttonStyle}>
                                                        <AntDesign name="minuscircleo" size={26} color="red" />
                                                    </TouchableOpacity>
                                                }
                                            </CartContext.Consumer>

                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.Price}

                        />
                    }
                </CartContext.Consumer>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 15, backgroundColor: 'skyblue' }}>
                    <CartContext.Consumer>
                        {cartContext => {
                            let total = 0
                            cartContext.listOfItems.forEach(item => total = total + item.price)
                            return (
                                < Text style={{ fontSize: 18, color: 'white', marginBottom: 60 }}>Total:  ${total.toFixed(2)}</Text>
                            )
                        }}
                    </CartContext.Consumer>
                </View>
            </View >
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
