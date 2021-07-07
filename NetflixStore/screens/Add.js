import React, {useState} from 'react'
import {Text,
    StyleSheet,
    ImageBackground
} from 'react-native'
import {container, Form, Item, Input, Button, H1, Container} from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

const Add = ({navigation, route}) => {
    const [name, setName] = useState('')
    const [totalNoSeason, setTotalnoSeason] = useState('')

    const addToList = async () => {
        try{
            if(!name || !totalNoSeason)
            {
                return alert('please add both fields')
            }
            const seasonToAdd = {
                id: shortid.generate(),
                name,
                totalNoSeason,
                isWached: false,
            }
            const storedValue = await AsyncStorage.getItem('@season_list')
            const prevList = await JSON.parse(storedValue)

            if(!prevList){
                const newList = [seasonToAdd]
                await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
            } else{
                prevList.push(seasonToAdd)
                await AsyncStorage.setItem('@season_list', JSON.stringify(prevList))
            }
            navigation.navigate('Home')
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <ImageBackground source={require('../Image/bg.jpg')} style={styles.img}>
           
                <ScrollView contentContainerStyle={styles.container}>
                    <H1 style={styles.heading}> Add to Watch</H1>
                    <Form>
                        <Item rounded style={styles.formItem}>
                            <Input placeholder="Season name" style={{color: "#ffffff", marginLeft: 10}} value={name} onChangeText={(text) => setName(text)}></Input>
                        </Item>
                        <Item rounded style={styles.formItem}>
                            <Input placeholder="Total no. of Season" style={{color: "#ffffff", marginLeft: 10}} value={totalNoSeason} onChangeText={(text) => setTotalnoSeason(text)}></Input>
                        </Item>
                        <Button rounded block onPress={addToList} style={{backgroundColor: "#7B241C", margin: 20, borderColor: "#000000", borderWidth: 2}}>
                            <Text style={{color: "#ffffff", fontSize: 20}}>Add</Text>
                        </Button>
                    </Form>
                </ScrollView>
            
        </ImageBackground>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#ffffff',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20
    },
    img: {
        flex: 1,
        position: 'relative',
        height: undefined,
        width: undefined,
        
    }
  });


