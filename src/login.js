import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';




import { strings } from './constants'



export default class Login extends Component {

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
            <View>
                <Image
                    style={styles.loginMemberBg}
                    source={require('./background/member_no_shadows.png')}
                />
                <View  style={styles.loginMember}>
                    <AntDesign name='user' color={'white'} size={100}/>
                    <Text style={styles.loginMemberText}>{strings.memberLogin}</Text>
                </View>
            </View>

            <View style={{marginTop:30, marginBottom:30}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> console.log('Login')}
                    >
                        <View style={styles.inlineIconText}>
                            <SimpleLineIcon name='login' color={'#c6d7b8'} size={20}/>
                            <Text style={styles.text}> {strings.signIn}</Text>
                        </View> 
                </TouchableOpacity>
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


           <View style={{marginBottom:10}}>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=> this.props.navigation.navigate('Login')}
                    >
                       
                            <Text style={styles.textFrgt}> {strings.forgotPassword}</Text>
                </TouchableOpacity>
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
        // justifyContent:'space-between',
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