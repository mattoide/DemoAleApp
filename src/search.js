import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, TextInput, TouchableOpacityBase } from 'react-native';
import fetchTimeout from 'fetch-timeout';
import { FlatGrid } from 'react-native-super-grid';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';  



import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { apiUrl } from '../App'

import { strings } from './constants'

const catImage = [    
    
    {name:'CAFE', img: require('./categoryImages/CAFE.png')},
    {name:'GELATERIE', img: require('./categoryImages/GELATERIE.png')},
    {name:'PANINOTECHE', img: require('./categoryImages/PANINOTECHE.png')},
    {name:'PASTICCERIE', img: require('./categoryImages/PASTICCERIE.png')},
    {name:'PIZZA AL TAGLIO', img: require('./categoryImages/PIZZA_AL_TAGLIO.png')},
    {name:'PIZZERIA', img: require('./categoryImages/PIZZERIE.png')},
    {name:'PUB', img: require('./categoryImages/PUB.png')},
    {name:'RISTORANTI', img: require('./categoryImages/RISTORANTI.png')},
    {name:'ROSTICCERIA', img: require('./categoryImages/ROSTICCERIE.png')},
    {name:'TAKE AWAY', img: require('./categoryImages/TAKE_AWAY.png')},
    {name:'TRATTORIE', img: require('./categoryImages/TRATTORIE.png')},
    {name:'WINE BAR', img: require('./categoryImages/WINE_BAR.png')},

]

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
        filtri: { categorie: [], prodotti: [], servizi: [] },
        filtriDisponibili: { categorie: [], prodotti: [], servizi: [] },
        list: [],
        type: "Categorie",
        result: []
    };

  }



  componentDidMount() {

    this.getOptions(apiUrl.getCategorie, function (err, resp, context) {
        if (err)
          return console.log(err)
  
        if (resp) {
          let cat = []
          resp.forEach(element => {
            element.active = false;

            catImage.forEach(catImg => {
                if(element.categoria == catImg.name){
                    element.img = catImg.img
                }
            })
            cat.push(element)
          });

          context.setState({ filtriDisponibili: { categorie: cat, prodotti: context.state.filtriDisponibili.prodotti, servizi: context.state.filtriDisponibili.servizi } });
          context.setState({ list: cat })
  
  
        }
      })
  } 
  aggiungiFiltro(item) {

    if (this.state.type == "Categorie")
      this.aggiungiCategoria(item.categoria)
    else if (this.state.type == "Prodotti")
      this.aggiungProdotto(item.prodotto)
    else if (this.state.type == "Servizi")
      this.aggiungiServizio(item.servizio)


  }

  aggiungiCategoria(categoria) {

    let cate = this.state.filtri.categorie;

    if (cate.includes(categoria))
      cate = cate.filter(e => e !== categoria);
    else
      cate.push(categoria)

    this.setState({ filtri: { categorie: cate, prodotti: this.state.filtri.prodotti, servizi: this.state.filtri.servizi } });

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

  cercaAziendaByCatProdServ(url, callback) {

    fetchTimeout(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ filtri: this.state.filtri })


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

  searchBy(){
    this.cercaAziendaByCatProdServ(apiUrl.cercaAziendaByCatProdServ, function (err, res, context) {

      if (err)
        return console.log(err)

        context.props.navigation.navigate('Found', {
        res: res
      });
    })
  }



  render() {


    return (

    <ImageBackground source={require('./background/bg.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.mainView}>

            <View style={styles.row}>

            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {strings.searchByPosition}
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {strings.searchByCity}
                    </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.row}>
            <TouchableOpacity
                style={styles.button}
            >
            <View style={styles.inlineIconText}>

                <EvilIcons name='search' color={'white'} size={25}/>
                <Text style={styles.buttonText}>
                    {strings.searchByKeyWord}
                </Text>

                </View>

            </TouchableOpacity>
        </View>

        <Text style={styles.buttonText}>
                    {strings.searchTitle}
                </Text>


                <FlatGrid
          itemDimension={100}
          items={this.state.list}
          style={styles.gridView}
          spacing={1}
          renderItem={({ item, index }) => (

            <View>
             <TouchableOpacity
                onPress={() => {
                item.active = !item.active;
                 this.aggiungiFiltro(item)
               }}
             > 
            
            <Image
                style={styles.itemImage}
                source={item.img}
            />

            <View  style={styles.checkOver}>
                <View style={item.active ? styles.isChecked : styles.isNotChecked}></View>
            </View>



            <View  style={styles.tetxOver}>
                <Text style={styles.text}>{item.categoria}</Text>
            </View>
            </TouchableOpacity> 
        </View>

            // <TouchableOpacity
            //   onPress={() => {
            //     item.active = !item.active;
            //     this.aggiungiFiltro(item)
            //   }}
            // >

            //   <View style={[styles.itemContainer, item.active ? { backgroundColor: 'gray', opacity: 0.6 } : {}]}>
            //     {this.state.type == "Categorie" ?
            //       <Text style={styles.itemName}>{item.categoria}</Text> :
            //       this.state.type == "Prodotti" ? <Text style={styles.itemName}>{item.prodotto}</Text> :
            //         this.state.type == "Servizi" ? <Text style={styles.itemName}>{item.servizio}</Text> : null
            //     }
            //   </View>
            // </TouchableOpacity> 
          )}

        />

        <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => this.searchBy()}>

            <Text style={styles.textSearch}>{strings.search}</Text>
        </TouchableOpacity>

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
        marginTop:2,
        width:'90%'
    },
    row:{
        flexDirection:'row',
        width:'90%',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center'

    },
    button:{
        alignItems:'flex-start',
        alignSelf:'center', 
        justifyContent:'center',
        padding:10,
        borderWidth:1,
        borderColor:'#c6d7b8',
        marginHorizontal:12.5,
        marginVertical:3
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        width:'100%'
    },
    inlineIconText:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage:{
        width:125,
        height:125
    },
    tetxOver:{
        position:'absolute',
         top:'85%',
        left:0,
        width:'105%'
    },
    checkOver:{
        position:'absolute',
        top:'4%',
        left:'80%'
        },
    text:{
        textAlign:'center',
        color:'white',
        backgroundColor:'black',
        opacity:.6,
        fontWeight:'bold'

    },
    gridView:{
        marginTop:10,
        width:'100%'
    },
    isNotChecked:{
        backgroundColor: 'whitesmoke', width: 20, height: 20, borderRadius: 100, borderWidth:2, borderColor:'black', opacity:.5
      },
      isChecked:{
        backgroundColor: '#628c30', width: 20, height: 20, borderRadius: 100, borderWidth:2, borderColor:'black', opacity:1
      },

      buttonSearch:{
        alignSelf:'center', 
        justifyContent:'center',
        padding:5,
        borderWidth:1,
        borderColor:'#c6d7b8',
        marginVertical:5,
        backgroundColor:'white',
        width:'100%'
      },
      textSearch:{
          color:'#4fae32',
          textAlign:'center',
          fontWeight:'bold'
        }

});