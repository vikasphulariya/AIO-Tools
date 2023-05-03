import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchBar({ fetchWeatherData }) {
  const [cityName, setCityName] = useState("");
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Enter City Name"
        value={cityName}
        style={{ width: "90%" ,fontWeight:'800',fontSize:15,color:'#d7d7d9' }}
        placeholderTextColor={'#d7d7d9'}
        onChangeText={(text) => setCityName(text)}
      />
      <EvilIcons
        name="search"
        size={32}
        color="black"
        onPress={() => fetchWeatherData(cityName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "grey",
  },
});
