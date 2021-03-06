import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Cerca from './src/cerca'
import Result from './src/result'
import Home from './src/home'
import Login from './src/login'
import Register from './src/register'
import RegisterCompany from './src/registerCompany'
import Search from './src/search'
import Found from './src/found'

 const baseUrl = "http://192.168.1.31:3000/";
//const baseUrl = "http://51.210.7.170:3000/";

export const apiUrl = {
    getCategorie: baseUrl + 'api/options/categorie',
    getProdotti: baseUrl + 'api/options/prodotti',
    getServizi: baseUrl + 'api/options/servizi',
    cercaAziendaByCatProdServ: baseUrl + 'api/azienda/cercaByCatProdServ'
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name="RegisterCompany" component={RegisterCompany} options={{headerShown:false}}/>
      <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
      <Stack.Screen name="Found" component={Found} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const Tab = createBottomTabNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="Home" tabBarOptions={{
//           activeTintColor: 'black',
//           inactiveTintColor: 'gray',
//           activeBackgroundColor:'gray',
//           adaptive:true,
//           allowFontScaling:true,
//           labelStyle:{fontSize:17, textAlign:'center', alignSelf:'center', justifyContent:'center', alignItems:'center' }
          
//           }}>
//       <Tab.Screen name="Cerca" component={Cerca} />
//       <Tab.Screen name="Risultati" component={Result} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }



export default App;