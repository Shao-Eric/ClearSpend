import React from 'react'
import {View,StyleSheet,StatusBar, Platform,FlatList,Text, TouchableOpacity} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Constants } from 'expo';
import { AntDesign } from '@expo/vector-icons';
export default class SearchScreen extends React.Component{
    state = {
        data: [],
        firstQuery:''
    };
    componentDidMount(){
        console.disableYellowBox = true;
        fetch('https://clear-spend-231908.appspot.com/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        "query": this.state.firstQuery,
                        "hospital": "NYP",
                        
                })
            }).then((response)=> 
                response.json()   
            ).then(data =>
                this.setState({data})
            )
    }

    addCart = () =>{
        console.log('add cart')
    }

    onIconPress = () =>{
        console.log('Go back Button Pressed')
    }

    onSubmitSearch = () => {
        this.setState({data:[]})
        console.log('searching')
        console.log(this.state.firstQuery)
        fetch('https://clear-spend-231908.appspot.com/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        "query": this.state.firstQuery,
                        "hospital": "NYP",
                        
                })
            }).then((response)=> 
                response.json()   
            ).then(data =>{
                console.log(data)
                if(data.length > 0){
                    this.setState({data})
                }else{
                    console.log('Mo match in database')
                }
            }       
            )
    }
    render(){
        return(
            <View style={styles.container}>
                <Searchbar
                icon={require('../assets/images/ic_action_chevron_left.png')}
                style={{ marginTop: STATUSBAR_HEIGHT, marginHorizontal: 8, marginBottom: 30 }}
                placeholder="Search Clear Spend..."
                onIconPress={this.onIconPress}
                onChangeText={query => { this.setState({ firstQuery: query }); }}
                onSubmitEditing={(event) => this.onSubmitSearch()}
                />

            <FlatList
                style={{ flex: 1 }}
                data={this.state.data}
                renderItem={({ item }) => (
                <View style={styles.cardStyle}>
                    <View style={styles.cardSectionStyle}>
                        <View style={styles.wrapContainer}>
                            <Text style={{ fontSize: 15 }}>
                                {item.Description}
                            </Text>
                        </View>
                        <View style={styles.headerContentStyle}>
                            <Text style={{ fontSize: 15, textAlign: 'center',width: 80 }}>
                                ${item.Price}
                            </Text>
                        </View>

                        <View
                            style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                            }}
                        >
                            <TouchableOpacity onPress={this.addCart} style={styles.buttonStyle}>
                                <AntDesign name="pluscircleo" size={35} color="green" />
                            </TouchableOpacity>
                        
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
      cardStyle:{
        borderWidth:1,
        borderRadius:2,
        borderColor:'#ddd',
        borderBottomWidth:0,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.1,
        shadowRadius:2,
        elevation:1,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        
      },
      cardSectionStyle:{
        borderBottomWidth:1,
        padding:5,
        backgroundColor:'#fff',
        justifyContent:'space-evenly',
        flexDirection:'row',
        borderColor:'#ddd',
        position:'relative',
        height:100
      },
      textStyle:{
        alignSelf:'center',
        color:'#007aff',
        fontSize:16,
        fontWeight:'600',
        paddingTop:10,
        paddingBottom:10
      },
      buttonStyle:{
        flex:1,
        alignSelf:'stretch',
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
      },
      wrapContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        width: 150
      }
  
  });