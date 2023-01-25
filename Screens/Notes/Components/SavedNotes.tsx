import { View, Text ,StyleSheet,Image} from 'react-native'
import React from 'react'
// import { Styles } from '../../src/styles/GlobalStyles'

export default function SavedNotes(props) {
  return (
    
    <View style={Styles.container}>
        <View style={Styles.main}>
            <View style={Styles.square}>

            </View>
      <Text style={Styles.text}>{props.text}</Text>

        </View>
        <View style={Styles.icon}  ></View>
    </View>
  )
}
const Styles=StyleSheet.create({
main:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
},
container:{  backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation:10,
    marginVertical:10},
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
    width:20,
    height:20,
    borderColor:'pink',
    borderRadius:20,
    opacity:0.8,
    borderWidth:2
}
})