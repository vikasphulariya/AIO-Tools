import { View, Text ,StyleSheet,Image} from 'react-native'
import React from 'react'
// import { Styles } from '../../src/styles/GlobalStyles'

export default function SavedLocations(props) {
  return (
    
    <View style={Styles.container}>
        <View style={Styles.main}>
            <View style={Styles.square}>

            </View>
      <Text style={Styles.text}>{props.text}</Text>

        </View>
        <Image style={Styles.icon} source={require('./map.png')} />
    </View>
  )
}
const Styles=StyleSheet.create({
main:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
    elevation: 15
},
container:{  backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:10,
    marginTop:5,
    elevation: 5},
square: {
    width: 24,
    height:24,
    backgroundColor:'pink',
    borderRadius:5,
    opacity:0.8,
    marginHorizontal:4,
    marginRight:10
},
text:{
    maxWidth:'80%'
},
icon:{
    width:24,
    height:24,
}
})