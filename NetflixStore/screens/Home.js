import React,{useState, useEffect} from 'react'
import {
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native'
import {
    List,
    Text,
    ListItem,
    Button,
    Left,
    Icon,
    Bosy,
    Right,
    CheckBox,
    Title,
    H1,
    Fab,
    Subtitle,
    Container,
    Body,
    Spinner
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import {useIsFocused} from '@react-navigation/native'



const Home = ({navigation, route}) => {
    const [listOfSeason, setListOfSeason] = useState([])
    const [loading, setloading] = useState(false)

    const isFocused = useIsFocused()

    const getList = async () => {
        setloading(true)
        const storedValue = await AsyncStorage.getItem('@season_list');
        if (!storedValue) {
            setListOfSeason([])
        }
        const list = JSON.parse(storedValue)
        setListOfSeason(list)
        setloading(false)
    }
    const deleteSeason = async (id) => {
        const newList = await listOfSeason.filter((list) => list.id !==id)
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
        setListOfSeason(newList)
    }
    const markComplete = async (id) => {
        const newArr = listOfSeason.map((list) => {
            if (list.id == id) {
                list.isWached = !list.isWached
            }
            return list
        })
        await AsyncStorage.setItem('@season_list', JSON.stringify(newArr))
        setListOfSeason(newArr)
    }

    useEffect(() => {
        getList();
    }, [isFocused])

    if(loading){
        return(
            <ImageBackground source={require('../Image/bg.jpg')} style={styles.img}>
                <Spinner color="#00b7c2"></Spinner>
            </ImageBackground>
        )
    }
    return(
        <ImageBackground source={require('../Image/bg.jpg')} style={styles.img}>
            <ScrollView contentContainerStyle={styles.container}>
            { 
                listOfSeason.length == 0 ? (
                <Container style={styles.container}>
                    <H1 style={styles.heading}>Watchlist is empty. please add a season</H1>
                </Container>
            )
            : (
                <>
                <H1 style={styles.heading}>Next series to watch</H1>
                <List>
                    {
                        listOfSeason.map((season) => (
                            <ListItem key={season.id} style={styles.listItem} noBorder>
                                <Left>
                                    <Button style={styles.actionButton} danger>
                                        <Icon name="trash" active onPress={() => deleteSeason(season.id)}></Icon>
                                    </Button>
                                    <Button style={styles.actionButton} onPress={() => {
                                        navigation.navigate('Edit', {season})
                                    }}>
                                        <Icon active name="edit" type="Feather"></Icon>
                                    </Button>
                                </Left>
                                <Body>
                                    <Title style={styles.seasonName}>{season.name}</Title>
                                    <Text note style={{color: "#F4F6F7", alignSelf: "center"}}>{season.totalNoSeason} season to watch</Text>
                                </Body>
                                <Right>
                                    <CheckBox checked={season.isWached} onPress={() => markComplete(season.id)}>

                                    </CheckBox>
                                </Right>
                            </ListItem>
                        ))
                    }
                </List>
                </>
            )}


            <Fab style={{backgroundColor: "#7B241C"}}  position="bottomRight" onPress={() => navigation.navigate('Add')}>  
            
                <Icon name="add"></Icon>
            </Fab>
        </ScrollView>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#ffffff',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#ffffff',
      alignSelf: "center"
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
    img: {
        flex: 1,
        height: undefined,
        width: undefined,
        
    }
  });