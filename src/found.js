import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Modal, TouchableHighlight,ImageBackground, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Octicons from 'react-native-vector-icons/Octicons';

import { SectionGrid } from 'react-native-super-grid';

import fetchTimeout from 'fetch-timeout';

import { apiUrl } from '../App'

import { strings } from './constants'




import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Found extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result: [],
            type: "Categorie",
            list: [],
            aziendeByFilter: []
          };
    }
   
    


    UNSAFE_componentWillMount() {

    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }

    componentDidMount(){

        if(this.props.route.params){
          if (this.state.result != this.props.route.params.res) {
              this.setState({ result: this.props.route.params.res })
              this.setResultByFiler("Categorie", this.props.route.params.res)
          }
      }
    }

    setResultByFiler(flt, res) {


      let filter = []
      let arr = this.state.result

      if (res)
          arr = res


      if (flt == "Categorie") {
          arr.forEach(element => {
              if (element.categoria && element.categoria != null && element.aziende.length > 0){
              element.title = element.categoria;
              element.data = element.aziende;
                  filter.push(element)
              }
          });
      }

      else if (flt == "Prodotti") {
          arr.forEach(element => {
              if (element.prodotto && element.prodotto != null && element.aziende.length > 0)
                  filter.push(element)
          });
      }

      else if (flt == "Servizi") {
          arr.forEach(element => {
              if (element.servizio && element.servizio != null && element.aziende.length > 0)
                  filter.push(element)
          });
      }

      this.setState({ list: filter })
      this.setState({ type: flt })
       
    }

    _renderItem = (item, index) =>{
 
      return (  
        <View style={styles.singleItem}>
                <TouchableOpacity
        >
          
                <Image
                    style={styles.itemImg}
                    source={require('./background/member_no_shadows.png')}
                />

        <Text style={styles.textName}>{item.nome}</Text>
        <Text style={styles.textDescr}>Qui va la descrizione breve</Text>

        <View style={styles.inlineItem}>
          <Text style={styles.textHour}>Aperto ora: 12:00 20:30</Text>
          <Text style={styles.textWhere}>             {item.indirizzo}</Text>
        </View>

        <View style={[styles.inlineItem, {alignSelf:'center'}]}>

        <TouchableOpacity
          style={styles.button}
        >
          <View style={styles.inline}>
            <Ionicons name='ios-call' color={'white'} size={25}/>
            <Text style={styles.buttonText}>  {strings.callNow}</Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
          >
             <View style={styles.inline}>
              <MaterialCommunityIcons name='whatsapp' color={'white'} size={25}/>
              <Text style={styles.buttonText}>  {strings.whatsapp}</Text>
            </View>
          </TouchableOpacity>

          </View>
          </TouchableOpacity>
        </View>
      )};

      _renderSection = (section) =>{

        return (  
          <View style={styles.singleItem}>
          <Text style={styles.textSection}>{section.title}</Text>
        </View>
        )};


    render() {


        return (
        <ImageBackground source={require('./background/bg.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.mainView}>

                <View style={styles.topView}>
                    <TouchableOpacity
                    onPress={()=>console.log(this.state)}
                    >
                        <View style={styles.inline}>
                            <Text style={styles.textSearch}>{strings.perfectSearch}</Text>
                            <Octicons style={styles.settingsIcon} name='settings' color={'white'} size={40}/>
                        </View>
                    </TouchableOpacity>                                      
                </View>

                      {/* <FlatGrid
                        itemDimension={100}
                        items={this.state.list}
                        style={styles.gridView}
                        spacing={1}
                        renderItem={({item, index}) => (this._renderItem(item, index))}
                      /> */}

<SectionGrid
        itemDimension={1000}
        // staticDimension={300}
        // fixed
         spacing={1}
        sections={this.state.list}
        style={styles.gridView}
        renderItem={({ item, section, index }) => (this._renderItem(item, index) )}
        renderSectionHeader={({ section }) => (this._renderSection(section))}
      />


            </View>
        </ImageBackground>

        );
    }

}




const styles = StyleSheet.create({
    mainView:{
        flex:1,
        alignItems:'center',
        alignSelf:'center',
        width:'100%',
        height:'100%',
    },
    topView:{
        width:'98%',
        flex:.1,
        margin:'1%',
        backgroundColor:'#619f29',
        opacity:.6,
        flexDirection:'column'
        },

        singleItem:{
          backgroundColor:'#619f29',
          opacity:.6,
          alignContent:'center',
          padding:'1%',
          margin:'1%',
          
        },
        itemImg:{
          width:100,
          height:100
      },

        singleSection:{
          backgroundColor:'#619f29',
          opacity:.6,
          justifyContent:'center'
        },

        textName:{
          color:'white',
          fontWeight:'bold',
          fontSize:28
        },
        textSection:{
          color:'white',
          fontWeight:'bold',
          fontSize:30,
          // alignSelf:'center'
      
        },

        textDescr:{
          color:'white',
          fontSize:22
        },
        textHour:{
          color:'white',
          fontSize:18,
          fontWeight:'bold',
        },       
         textWhere:{
          color:'white',
          fontSize:18,
        },
        inline:{
            flexDirection:'row',
            alignItems: 'center',
            alignSelf:'flex-end'
        },
        inlineItem:{
          flexDirection:'row',
          alignItems: 'center',
      },
        settingsIcon:{
            margin:10,
         
        },
        textSearch:{
            color:'white',
            textAlign:'center',
            fontWeight:'bold',
            fontSize:20,
            alignSelf:'flex-end',
            marginVertical:10
          },
          gridView:{
            flex:1,
            //width:'100%',
            // backgroundColor:'red',

          },
          button:{
            backgroundColor:'#3d752a',
            margin:'2%',
            padding:'1%',
  
          },
          buttonText:{
            color:'white',
            fontSize:16,
            fontWeight:'bold',
          },
          inlineButton:{
            flexDirection:'row',
            alignItems: 'center',
        },
}); 