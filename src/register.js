import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




import { strings } from './constants'



export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }



  componentDidMount() {

  }




  render() {


    return (
    <ImageBackground source={require('./background/bg.png')} style={{width: '100%', height: '100%'}}>

        <View style={styles.mainView}>
      

            <View style={{marginTop:30, marginBottom:30}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> console.log('Registra')}
                    >
                        <View style={styles.inlineIconText}>
                        <MaterialCommunityIcons name='account-card-details-outline' color={'#c6d7b8'} size={20}/>
                            <Text style={styles.text}> {strings.signUp}</Text>
                        </View> 
                </TouchableOpacity>
            </View>
           
            <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.email}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.username}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.password}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

        </View>
    </ImageBackground>

    );
  }

}




const styles = StyleSheet.create({

    mainView:{
        flex:1,
        flexDirection:'column',
        paddingVertical:60,
         justifyContent:'center',
        alignItems:'center',
    },
    loginMember:{
        position:'absolute',
         top:13,
        left:24,
    },
    loginMemberText:{
        textAlign:'center',
        color:'white',
    },

    loginMemberBg:{
        width:150,
        height:150
    },
    text:{
        textAlign:'center',
        color:'#c6d7b8',
        fontSize:20
    },   
     textFrgt:{
        textAlign:'center',
        color:'#c6d7b8',
        fontSize:15
    },
    inlineIconText:{
        flexDirection: 'row',
         alignItems: 'center'
    },
    input:{
        borderColor: 'white', 
        borderWidth: 1,
        width:250,
        height:40
    },
    textInput:{
        textAlign:'right',
        color:'#c6d7b8',
        fontSize:15
    },


});