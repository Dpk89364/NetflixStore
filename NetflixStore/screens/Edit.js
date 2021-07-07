import React, {useState, useEffect} from 'react'
import {
    ScrollView,
    StyleSheet,
    ImageBackground
} from 'react-native'
import {
        Text,
        Button,
        H1,
        Form,
        Item,
        Input,
        Container,
    } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'


const Edit = ({navigation, route}) => {
    const [name, setname] = useState('')
    const [totalNoSeason, setTotalNoSeasson] = useState('')
    const [id, setid] = useState(null)

    const update = async () => {
        try {
            if (!name || !totalNoSeason) {
                return alert("Please enter value in both field")
            }
            const seasontoUpdate = {
                id,
                name,
                totalNoSeason,
                isWached: false
            }

            const storedValue = await AsyncStorage.getItem('@season_list')
            const list = await JSON.parse(storedValue)
            list.map((singleSeason) => {
                if (singleSeason.id == id) {
                    singleSeason.name=name;
                    singleSeason.totalNoSeason=totalNoSeason;                    
                }
                return singleSeason
            })
            await AsyncStorage.setItem('@season_list', JSON.stringify(list))
            navigation.navigate('Home')


        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const {season} = route.params
        const {id,name,totalNoSeason} = season

        setid(id)
        setname(name)
        setTotalNoSeasson(totalNoSeason)
    }, [])
    
    

    return(
        <ImageBackground source={require('../Image/bg.jpg')} style={styles.img}>
            
                <ScrollView contentContainerStyle={styles.container}>
                    <H1 style={styles.heading}> Edit</H1>
                    <Form>
                        <Item rounded style={styles.formItem}>
                            <Input placeholder="Season name" style={{color: "#eee", marginLeft: 10}} value={name} onChangeText={(text) => setName(text)}></Input>
                        </Item>
                        <Item rounded style={styles.formItem}>
                            <Input placeholder="Total no. of Season" style={{color: "#eee", marginLeft: 10}} value={totalNoSeason} onChangeText={(text) => setTotalNoSeasson(text)}></Input>
                        </Item>
                        <Button rounded block onPress={update} style={{backgroundColor: "#7B241C", margin: 20, borderColor: "#000000", borderWidth: 2}}>
                            <Text style={[{color: "#ffffff", fontSize: 20}]}>Update</Text>
                        </Button>
                    </Form>
                </ScrollView>
            
        </ImageBackground>
    )
}

export default Edit

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
        height: undefined,
        width: undefined, 
    }
  });




  