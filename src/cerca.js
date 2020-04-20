import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';

import fetchTimeout from 'fetch-timeout';



import { apiUrl } from '../App'

export default class Cerca extends Component {

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
          cat.push(element)
        });

        context.setState({ filtriDisponibili: { categorie: cat, prodotti: context.state.filtriDisponibili.prodotti, servizi: context.state.filtriDisponibili.servizi } });
        context.setState({ list: cat })


      }
    })

    this.getOptions(apiUrl.getProdotti, function (err, resp, context) {
      if (err)
        return console.log(err)

      if (resp) {
        let cat = []
        resp.forEach(element => {
          element.active = false;
          cat.push(element)
        });

        context.setState({ filtriDisponibili: { categorie: context.state.filtriDisponibili.categorie, prodotti: cat, servizi: context.state.filtriDisponibili.servizi } });
      }
    })

    this.getOptions(apiUrl.getServizi, function (err, resp, context) {
      if (err)
        return console.log(err)

      if (resp) {
        let cat = []
        resp.forEach(element => {
          element.active = false;
          cat.push(element)
        });
        context.setState({ filtriDisponibili: { categorie: context.state.filtriDisponibili.categorie, prodotti: context.state.filtriDisponibili.prodotti, servizi: cat } });
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

  aggiungProdotto(prodotto) {

    let prodo = this.state.filtri.prodotti;

    if (prodo.includes(prodotto))
      prodo = prodo.filter(e => e !== prodotto);
    else
      prodo.push(prodotto)

    this.setState({ filtri: { categorie: this.state.filtri.categorie, prodotti: prodo, servizi: this.state.filtri.servizi } });

  }

  aggiungiServizio(servizio) {

    let servi = this.state.filtri.servizi;

    if (servi.includes(servizio))
      servi = servi.filter(e => e !== servizio);
    else
      servi.push(servizio)

    this.setState({ filtri: { categorie: this.state.filtri.categorie, prodotti: this.state.filtri.prodotti, servizi: servi } });
  }

  render() {


    return (
      <View style={{ flex: 1 }}>

        <View style={{ flex: .08, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: .6, padding: 3 }}>

          <View style={this.state.type != "Categorie" ? styles.headerButton : styles.headerButtonActive}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ list: this.state.filtriDisponibili.categorie })
                this.setState({ type: "Categorie" })
              }}
            >
              <Text style={styles.itemName}>CATEGORIE</Text>
            </TouchableOpacity>
          </View>

          <View style={this.state.type != "Prodotti" ? styles.headerButton : styles.headerButtonActive}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ type: "Prodotti" })
                this.setState({ list: this.state.filtriDisponibili.prodotti })
              }
              }
            >
              <Text style={styles.itemName}>PRODOTTI</Text>
            </TouchableOpacity>

          </View>

          <View style={this.state.type != "Servizi" ? styles.headerButton : styles.headerButtonActive}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ type: "Servizi" })
                this.setState({ list: this.state.filtriDisponibili.servizi })
              }
              }
            >
              <Text style={styles.itemName}>SERVIZI</Text>

            </TouchableOpacity>
          </View>

        </View>

        <FlatGrid
          itemDimension={100}
          items={this.state.list}
          style={styles.gridView}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              onPress={() => {
                item.active = !item.active;
                this.aggiungiFiltro(item)
              }}
            >

              <View style={[styles.itemContainer, item.active ? { backgroundColor: 'gray', opacity: 0.6 } : {}]}>
                {this.state.type == "Categorie" ?
                  <Text style={styles.itemName}>{item.categoria}</Text> :
                  this.state.type == "Prodotti" ? <Text style={styles.itemName}>{item.prodotto}</Text> :
                    this.state.type == "Servizi" ? <Text style={styles.itemName}>{item.servizio}</Text> : null
                }
              </View>
            </TouchableOpacity>
          )}

        />
        <View style={styles.floating}>
          <TouchableOpacity
            onPress={() => {
              this.cercaAziendaByCatProdServ(apiUrl.cercaAziendaByCatProdServ, function (err, res, context) {

                if (err)
                  return console.log(err)
                // context.setState({result:res})
                // console.log(res)
                
                context.props.navigation.navigate('Risultati', {
                  res: res
                });
              })
            }}
          >
            <SearchIcon name='search' size={50} />

          </TouchableOpacity>
        </View>

      </View>

    );
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

}




const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    // marginBottom:-66,
    marginBottom: -48,
    flex: 1,
    //  backgroundColor:'red',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 0,
    height: 150,
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1

  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  headerButton: {
    flex: 1,
    padding: 2,
    backgroundColor: 'whitesmoke',
    borderRadius: 5
  },

  headerButtonActive: {
    flex: 1,
    padding: 2,
    backgroundColor: 'gray',
    borderRadius: 5

  },

  floating: {
    position: 'relative',
    bottom: 10,
    left: 320,
    borderRadius: 100,
    // backgroundColor:'red',
    width: 60,
    height: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }
});