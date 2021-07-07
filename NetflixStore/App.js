import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from'./screens/Home'
import Add from'./screens/Add'
import Edit from'./screens/Edit'

const Stack = createStackNavigator();


const App = () =>{
 return(
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       
          <Stack.Screen name="Home" component={Home} options={{headerStyle:{backgroundColor: "#000000"},title: 'NETFLIX', headerTitleStyle: {textAlign: "center", color: "#7B241C", fontSize: 35,}}}>

          </Stack.Screen>
          <Stack.Screen name="Add" component={Add}  options={{headerStyle:{backgroundColor: "#000000"},title: 'NETFLIX', headerTitleStyle: {textAlign: "center", color: "#7B241C", fontSize: 35, marginRight: 55}}}>

          </Stack.Screen>
          <Stack.Screen name="Edit" component={Edit}  options={{headerStyle:{backgroundColor: "#000000"},title: 'NETFLIX', headerTitleStyle: {textAlign: "center", color: "#7B241C", fontSize: 35, marginRight: 55}}}>

          </Stack.Screen>
       

     </Stack.Navigator>
   </NavigationContainer>
 )
}

export default App;

