import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useEffect,useRef}from 'react'
import {useRoute} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-elements';
import GOOGLE_CLOUD_CREDENTIALS from '../../config'

const Direction = ({navigation}) => {

    const mapRef = useRef(null)
    const router = useRoute()
    const rideData = router.params?.item
    
    useEffect(() => {
        mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
          edgePadding:{ top:100,right:50,bottom:100,left:50}
        })
    }, [])

  return (
    <View>
        <View style = {styles.directionBack}>
            <TouchableOpacity activeOpacity={0.6} onPress = {() => navigation.navigate('home')}>
                <View style = {{backgroundColor:'black',padding:12,borderRadius:12}}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </View>
            </TouchableOpacity>
        </View>
        <View>
        <MapView
        ref={mapRef}
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: rideData.origin.origin.latitude,
          longitude: rideData.origin.origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
            <Marker coordinate={rideData.origin.origin} title = {rideData.origin.originAddress} identifier='origin'></Marker>
            <Marker coordinate={rideData.destination} title = {rideData.destinationAddress} identifier='destination'></Marker>
            <MapViewDirections
              origin={rideData.origin.origin}
              destination={rideData.destination}
              apikey={GOOGLE_CLOUD_CREDENTIALS.key}
              strokeColor='black'
              strokeWidth={3}
            />
        </MapView>
        </View>
        <View style = {styles.directionFooter}>
            <Text style = {{fontSize:20,fontWeight:'600',color:'white'}}>Enjoy Your Ride</Text>
        </View>
    </View>
  )
}

export default Direction

const styles = StyleSheet.create({
    directionBack:{
        position:'absolute',
        top:50,
        left:20,
        zIndex:10
    },
    map:{
        height:'100%',
        width:'100%'
    },
    directionFooter:{
        position:'absolute',
        bottom:50,
        backgroundColor:'black',
        padding:20,
        alignSelf:'center',
        borderRadius:16
    }
})