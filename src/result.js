import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Modal, TouchableHighlight } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';

import fetchTimeout from 'fetch-timeout';



import { apiUrl } from '../App'
import { BaseRouter } from '@react-navigation/native';
import { log } from 'react-native-reanimated';


export default class Categorie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result: [],
            type: "Categorie",
            list: [],
            aziendeByFilter: [],
            modalVisible: false
        };
    }


    UNSAFE_componentWillMount() {
        
        if(this.props.route.params){
        if (this.state.result != this.props.route.params.res) {
            this.setState({ result: this.props.route.params.res })
            this.setResultByFiler("Categorie", this.props.route.params.res)
        }
    }
}

    componentDidUpdate() {

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
                if (element.categoria && element.categoria != null && element.aziende.length > 0)
                    filter.push(element)
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


    render() {


        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: .08, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: .6, padding: 3 }}>

                    <View style={this.state.type != "Categorie" ? styles.headerButton : styles.headerButtonActive}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.setState({ type: "Categorie" })
                                this.setResultByFiler("Categorie");
                            }}
                        >
                            <Text style={styles.itemName}>CATEGORIE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={this.state.type != "Prodotti" ? styles.headerButton : styles.headerButtonActive}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.setState({ type: "Prodotti" })
                                this.setResultByFiler("Prodotti");
                            }
                            }
                        >
                            <Text style={styles.itemName}>PRODOTTI</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={this.state.type != "Servizi" ? styles.headerButton : styles.headerButtonActive}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.setState({ type: "Servizi" })
                                this.setResultByFiler("Servizi");
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

                        <View>

                            {item.categoria ?

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ aziendeByFilter: item.aziende })
                                        this.setState({ modalVisible: true })

                                    }}
                                >

                                    <View style={[styles.itemContainer]}>
                                        <Text style={styles.itemName}>{item.categoria}</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                item.prodotto ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ aziendeByFilter: item.aziende })
                                            this.setState({ modalVisible: true })
                                        }}
                                    >

                                        <View style={[styles.itemContainer]}>
                                            <Text style={styles.itemName}>{item.prodotto}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :

                                    item.servizio ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ aziendeByFilter: item.aziende })
                                                this.setState({ modalVisible: true })
                                            }}
                                        >

                                            <View style={[styles.itemContainer]}>
                                                <Text style={styles.itemName}>{item.servizio}</Text>
                                            </View>
                                        </TouchableOpacity> :

                                        null

                            }

                        </View>
                    )}
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{ flex: 1, backgroundColor: 'lightgray', opacity: 0.9 }}>
                        <View>
                            <FlatGrid
                                itemDimension={300}
                                items={this.state.aziendeByFilter}
                                style={styles.gridViewSingle}
                                spacing={5}
                                renderItem={({ item, index }) => (

                                    <View style={styles.singleAzienda}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}><Text style={{ fontSize: 20 }}>Nome: </Text> {item.nome}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}><Text style={{ fontSize: 20 }}>Indirizzo: </Text> {item.indirizzo}</Text>
                                    </View>
                                )}
                            >


                            </FlatGrid>


                        </View>


                        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 50 }}>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setState({ modalVisible: false })
                                }}
                                style={{ borderWidth: 1, borderRadius: 10 }}
                            >
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>Chiudi</Text>
                            </TouchableHighlight>
                        </View>

                    </View>



                </Modal>
            </View>

        );
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
        bottom: 30,
        left: 320,
        borderRadius: 100,
        // backgroundColor:'red',
        width: 60,
        height: 60,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    gridViewSingle: {
        flex: 1,
        marginBottom: '-100%'
    },
    singleAzienda: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        padding: 3
    }
});