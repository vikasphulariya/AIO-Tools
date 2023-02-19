import { View, Text,StyleSheet} from 'react-native'
import React from 'react'

export default function Inidividual(props) {
  return (
    <View style={styles.Container} >
      <Text style={styles.stateName}>{props.data.State}</Text>
      <View style={styles.item}>
        <View style={styles.confirmed}>
            <Text style={styles.itemText}>Confirmed</Text>
            <Text>{props.data.Total}</Text>
             </View>
             <View style={styles.active}>
            <Text style={styles.itemText} >Active</Text>
            <Text>{props.data.Active}</Text>
             </View>
             <View style={styles.cured}>
            <Text style={styles.itemText} >Cured</Text>
            <Text  >{props.data.Cured}</Text>
             </View>
             <View style={styles.deaths}>
            <Text style={styles.itemText} >Deaths</Text>
            <Text>{props.data.Death}</Text>
             </View>
             <View style={styles.cured}>
            <Text style={styles.itemText} >Cure Ratio</Text>
            <Text>{props.data.CuRatio}%</Text>
             </View>
             <View style={styles.deaths}>
            <Text style={styles.itemText} >Death Ratio</Text>
            <Text>{props.data.DeRatio}%</Text>
             </View>
             <View style={styles.Vaccin}>
            <Text style={[styles.itemText,{color:'black'}]}>Vaccination</Text>
            <Text>{props.data.Vaccin}</Text>
             </View>

      </View>
    </View>
  )
}

const styles=StyleSheet.create({
Container:{
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#C0C0C0',
    width:'95%',
    borderRadius:8,
    paddingHorizontal:10,
    alignItems:'center',
    margin:5,
    elevation:5,
    marginLeft:10,
    marginBottom:10
},
stateName:{
    fontWeight:'900',
    fontSize:20,
    marginTop:4,
    elevation:15
},
itemText:{
    fontWeight:"700"
},
confirmed:{
    borderColor:'#806408',
    borderWidth:1,
    padding:5,
    alignItems: 'center',
    backgroundColor:'#f0cb51',
    borderRadius:5,
   margin:5,
   elevation:10,
   marginHorizontal:5,
   paddingHorizontal:10
//    marginHorizontal:5,paddingHorizontal:10
    
},
deaths:{
    borderColor:'#bf1a08',
    borderWidth:1,
    padding:5,
    alignItems: 'center',
    backgroundColor:'#e87b7b',
    borderRadius:5,
   margin:4,
   elevation:10,marginHorizontal:5,paddingHorizontal:10
},
active:{
    borderColor:'#097c82',
    borderWidth:1,
    padding:5,
    alignItems: 'center',
    backgroundColor:'#11ecf7',
    borderRadius:5,
   margin:4,
    elevation:10,marginHorizontal:5,paddingHorizontal:10
},
Vaccin:{
    borderColor:'#820180',
    borderWidth:1.2,
    padding:5,
    alignItems: 'center',
    backgroundColor:'#ed68eb',
    borderRadius:5,
   margin:4,
   elevation:10,marginHorizontal:5,paddingHorizontal:10
},
cured:{
    borderColor:'#098215',
    borderWidth:1,
    padding:5,
    alignItems: 'center',
    backgroundColor:'#6ff774',
    borderRadius:5,
   margin:4,
   elevation:10,marginHorizontal:5,paddingHorizontal:10
},
item:{
    flexDirection:'row',
    marginVertical:8,
    flexWrap:'wrap',
    alignItems: 'center',
    alignContent:'space-around',
    justifyContent: 'center',
    // borderWidth:2
},
})