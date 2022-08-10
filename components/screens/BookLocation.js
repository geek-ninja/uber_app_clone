import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation,useRoute} from '@react-navigation/native';

import GOOGLE_CLOUD_CREDENTIALS from '../../config'

const BookLocation = () => {

  const router = useRoute()
  const navigator = useNavigation()
  const origin = router.params.item
  const [destination,setDestination] = useState({})
  const [destinationAddress,setDestinationAddress] = useState('')
  const [isSelect,setIsSelect] = useState(false)

  useEffect(() => {
    if(isSelect){
      navigator.navigate('direction',{item:{origin,destination,destinationAddress}})
    }
  }, [isSelect])
  
  return (
    <SafeAreaView>
    <View style = {{height:'100%',width:'100%'}}>
      <GooglePlacesAutocomplete
        styles={{
          container:{
            flex:0
          },
          textInput:{
            fontSize:18
          }
        }}
        onPress = {(data,details = null) => {
          setDestination({
            latitude : details?.geometry.location.lat,
            longitude: details?.geometry.location.lng
          })
          setDestinationAddress(data.description)
          console.log(destination)
          console.log(destinationAddress)
          setIsSelect(true)
          // navigator.navigate('direction',{item:{origin,destination,destinationAddress}})
        }}
        placeholder='Select Destination'
        minLength={2}
        fetchDetails = {true}
        enablePoweredByContainer = {false}
        nearbyPlacesAPI="GooglePlacesSearch"
        query={{key:GOOGLE_CLOUD_CREDENTIALS.key,language:'en',components:'country:ind'}}
        debounce = {400}
      />
    </View>
    </SafeAreaView>
  )
}

export default BookLocation

const styles = StyleSheet.create({})