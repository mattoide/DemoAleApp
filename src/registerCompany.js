import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatGrid } from 'react-native-super-grid';
import CheckBox from '@react-native-community/checkbox';
import fetchTimeout from 'fetch-timeout';



import { apiUrl } from '../App'




import { strings } from './constants'



export default class RegisterCompany extends Component {

  constructor(props) {
    super(props);

    this.state = {
       servizi: [] 
    };

  }



  componentDidMount() {

    this.getOptions(apiUrl.getServizi, function (err, resp, context) {
        if (err)
          return console.log(err)
  
        if (resp) {
          let serv = []
          resp.forEach(element => {
            element.active = false;
            serv.push(element)
          });
          context.setState({servizi: serv});
        }
      })

  }

  getOptions(url, callback) {

    fetchTimeout(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }, 5000, 'Il server non risponde')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Status code not OK', res.status);
        } else {
          return res.json();
        }
      })
      .then(json => {
        callback(null, json, this);
      })
      .catch(err => {
        console.log("error", err);
      });
  }


setActive(item){
    let serv = this.state.servizi;

    serv.forEach(element => {
        if(item.servizio == element.servizio)
        element.active = !element.active;
      });

      this.setState({servizi: serv})
}

  render() {


    return (
    <ImageBackground source={require('./background/bg.png')} style={{width: '100%', height: '100%'}}>
      <ScrollView >

        <View style={styles.mainView}>
      

            <View style={{marginTop:30, marginBottom:10}}>

            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Image
                    style={styles.loginMemberBg}
                    source={require('./background/member_no_shadows.png')}
                />
                <View  style={styles.loginMember}>
                <MaterialCommunityIcons name='factory' color={'white'} size={70}/>
                    <Text style={styles.loginMemberText}>{strings.newCompany}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> console.log('Registra')}
                    >
                        <View style={styles.inlineIconText}>
                        <MaterialCommunityIcons name='account-card-details-outline' color={'#c6d7b8'} size={20}/>
                            <Text style={styles.text}> {strings.signUpCompany}</Text>
                        </View> 
                </TouchableOpacity>
                </View>

            </View>
           
            <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.category}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.businessName}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.address}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           
           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.city}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           
           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.province}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           
           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.zip}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           
           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.email}</Text>
           <TextInput
                style={styles.input}
                onChangeText={text => console.log(text)}
            />
           </View>

           <View style={{marginBottom:10}}>
               <Text style={styles.textInput}>{strings.description}</Text>
           <TextInput
                style={styles.descriptionInput}
                onChangeText={text => console.log(text)}
            />
           </View>


           <FlatGrid
          itemDimension={170}
          items={this.state.servizi}
          style={styles.grid}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              onPress={() => { this.setActive(item)}}
            >


              <View style={styles.inlineIconText}>


                <CheckBox
                value={item.active} 
                />
              
                  <Text style={styles.text}>{item.servizio}</Text> 

              </View>
            </TouchableOpacity>
          )}

        />

        


        </View>
        </ScrollView>
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
         top:5,
        left:12,
    },
    loginMemberText:{
        textAlign:'center',
        color:'white',
        fontSize:10
    },

    loginMemberBg:{
        width:100,
        height:100
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
    descriptionInput:{
        borderColor: 'white', 
        borderWidth: 1,
        width:380,
        height:100
    },
    textInput:{
        textAlign:'right',
        color:'#c6d7b8',
        fontSize:15
    },
    button:{
        justifyContent:'center'
    },
    grid:{
        alignSelf:'center'
    }


});