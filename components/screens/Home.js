import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation,useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import MapViewDirections from 'react-native-maps-directions';

const Home = () => {

  const navigator = useNavigation()
  
  const [origin,setOrigin] = useState({
    latitude : 20.2960587,
    longitude: 85.8245398
  })
  const [originAddress,setOriginAddress] = useState('')
  const [isOrigin,setIsOrigin] = useState(false)
  
  const mapRef = useRef(null)

  useEffect(() => {
    if(!isOrigin){
      getLocation()
    }
    mapRef.current.fitToSuppliedMarkers(["origin"],{
      edgePadding:{ top:100,right:50,bottom:100,left:50}
    })
  }, [origin])

  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted'){
      console.log('location permission not granted')
      return
    }
    const userLocation = await Location.getCurrentPositionAsync({})
    const userAddress = await Location.reverseGeocodeAsync(userLocation.coords)
    setOrigin({
      latitude:userLocation.coords.latitude,
      longitude:userLocation.coords.longitude
    })
    setOriginAddress(userAddress[0]?.district+','+userAddress[0]?.city+','+userAddress[0]?.region)
    setIsOrigin(true)
  }
  
  return (
    <View style = {styles.home}>
      <View style = {styles.homeMap}>
        <MapView
        ref={mapRef}
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
          {
            isOrigin ? <Marker coordinate={origin} title = "my location" identifier='origin'></Marker> : <></>
          }
        </MapView>
      </View>
      <View style = {styles.homeSetLoc}>
        <View style = {{paddingLeft:30,marginTop:20}}>
          <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'}} style = {{height:50,width:80,resizeMode:'contain'}}/>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress = {() => navigator.navigate('book',{item:{origin,originAddress}})}>
          <View style = {styles.homeSearchLoc}>
            <FontAwesome name="search" size={24} color="black" />
            <Text style = {{color:'grey',marginLeft:5}}>Where to?</Text>
          </View>
        </TouchableOpacity>
          <View style = {styles.homeDirection}>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
              <AntDesign name="enviroment" size={24} color="#8200FF" />
              {
                originAddress ?
                <Text style = {styles.placeName}>{originAddress}</Text>
                :
                <Button
                loading = {true}
                type = "clear"
                />
              }
            </View>
            <View>
              <View style = {styles.flowLine}/>
            </View>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
              <AntDesign name="caretdown" size={24} color="#8200FF" />
              <Text style = {styles.placeName}>Select Destination</Text>
            </View>
          </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home:{
    position:'relative',
    backgroundColor:'#FFFFFF',
    height:'100%',
    width:'100%'
  },
  homeMap:{
    height:'60%',
    width:'100%',
    backgroundColor:'black'
  },
  map:{
    width:'100%',
    height:'100%'
  },
  homeSetLoc:{
    backgroundColor:'#FFFFFF',
    borderTopLeftRadius:24,
    borderTopRightRadius:24,
    marginTop:-20,
    height:'100%',
    width:'100%',
    elevation:5
  },
  homeSearchLoc:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#E2E2E2',
    marginHorizontal:30,
    marginTop:10,
    paddingHorizontal:10,
    paddingVertical:8,
    borderRadius:16
  },
  homeDirection:{
    marginTop:30,
    marginHorizontal:30,
  },
  placeName:{
    fontSize:16,
    fontWeight:'600',
    marginLeft:10
  },
  flowLine:{
    width:2,
    height:40,
    backgroundColor:'black',
    marginLeft:11,
    marginTop:5
  }
})