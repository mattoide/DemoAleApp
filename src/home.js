import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Svg } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SvgUri from 'react-native-svg-uri';



import { strings } from './constants'

const iconSize = 30;

export default class Home extends Component {

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
          <Text style={styles.title}>{strings.home_title_0}</Text>
          <Text style={styles.title}>{strings.home_title_1}</Text>
          </View>
    

          <TouchableOpacity
            style={styles.button}
            onPress={()=> this.props.navigation.navigate('Login')}
      >
          <View style={styles.inlineIconText}>
          {/* <SvgUri width="50" height="50" color='black' source={require('./icons/login.svg')} /> */}
        <SimpleLineIcon name='login' color={'#c6d7b8'} size={iconSize}/>
        <Text style={styles.text}> {strings.signIn}</Text>
        </View> 
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigation.navigate('Register')}
          >
         <View style={styles.inlineIconText}>
          <MaterialCommunityIcons name='account-card-details-outline' color={'#c6d7b8'} size={iconSize}/>
            <Text style={styles.text}> {strings.signUp}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigation.navigate('RegisterCompany')}
      >
          
          <View style={styles.inlineIconText}>
          <MaterialCommunityIcons name='factory' color={'#c6d7b8'} size={iconSize}/>
          <Text style={styles.text}> {strings.newCompany}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigation.navigate('Search')}
      >
          
          <View style={styles.inlineIconText}>
          <MaterialCommunityIcons name='account-badge-horizontal-outline' color={'#c6d7b8'} size={iconSize}/>
          <View style={{alignItems:'center', alignContent:'center', textAlign:'center', justifyContent:'center'}}>
            <Text style={styles.text}>{strings.visitor}</Text>
            <Text style={styles.textDescr}>  {strings.visitorDescr}</Text>
          </View>
           
        </View>
        
      </TouchableOpacity>

    <View style={styles.infoView}>
        <TouchableOpacity
            style={styles.buttonInfo}
            onPress={()=> console.log("as")}
        >
            <View style={styles.inlineIconText}>
                <SimpleLineIcon name='question' color={'#c6d7b8'} size={20}/>
                <Text style={styles.textInfo}> {strings.howItWorks}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.buttonInfo}
            onPress={()=> console.log("as")}
        >
            <View style={styles.inlineIconText}>
                <SimpleLineIcon name='exclamation' color={'#c6d7b8'} size={20}/>
                <Text style={styles.textInfo}> {strings.info}</Text>
            </View>
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
        // backgroundColor:'green',
        paddingVertical:30,
        justifyContent:'space-between'
    },
    inlineIconText:{
        flexDirection: 'row',
         alignItems: 'center'
    },

    title:{
        textAlign:'center',
        color:'#c6d7b8',
        fontSize:15
    },
    text:{
        textAlign:'center',
        color:'#c6d7b8',
        fontSize:20
    },
    textDescr:{
        textAlign:'center',
        color:'#c6d7b8',
        fontSize:10
    },
    textInfo:{
        textAlign:'center',
        color:'#c6d7b8',
        fontSize:15
    },

    button:{
        alignItems:'flex-start',
        alignSelf:'center', 
        justifyContent:'center',
        padding:10,
        borderWidth:1,
        borderTopRightRadius:25,
        borderColor:'#c6d7b8',
        minWidth:270,
        minHeight:80
    },

    infoView:{
        flexDirection:'column',
        // backgroundColor:'green',
        paddingVertical:30,
    },
    buttonInfo:{
        alignItems:'center',
        alignSelf:'center',
        padding:10,
        minWidth:30
    }

});