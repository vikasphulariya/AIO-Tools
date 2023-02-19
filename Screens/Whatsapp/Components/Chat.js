import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ChatHistory = (props) => {
  return (
    <View style={styles.items}>
      <View style={styles.itemLeft}>
        <View style={styles.icon}>

        </View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <View style={styles.circle}></View>
    </View>
  )
}
const styles = StyleSheet.create({
  items: {
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical:10,
    marginHorizontal:10,
    elevation:5,
    width:'81.5%'
  },
  itemLeft: {
    flexDirection: "row",
    alignItems:'center',
    flexWrap:'wrap',
  },
  icon: {
    width:24,
    height:24,
    backgroundColor:"#38b000",
    opacity:0.4,
    borderRadius:7,
    marginRight:15,
  },
  circle: {
    width:12,
    height:12,
    borderColor:'#38b000',
    borderWidth:2,
    borderRadius:10,
  },
  text: {
    maxWidth:'80%'
  }
})

export default ChatHistory;