import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import SearchBar from "./SearchBar";
import { haze, rainy, snow, sunny } from "../img/index";

export default function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(haze);
  console.log("kkk", weatherData, "ooo");
  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  } = weatherData;
  const [{ main }] = weather;
  console.log("sgegweg", main);

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    console.log(weather);
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    return haze;
  }

  let textcolor = backgroundImage !== sunny ? "white" : "black";

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizedMode="cover" 
        
      >
        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={styles.header}>
          <Text style={[styles.headerText, {color: textcolor, fontWeight: "bold", fontSize: 46}]}>
            {name}
          </Text>
          <Text style={[styles.headerText, {color: textcolor, fontWeight: "bold"}]}>
            {main}
          </Text>
          <Text style={[styles.headerText, {color: textcolor}]}>
            {temp}°C
          </Text>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={styles.infoText}>Humidity</Text>
            <Text style={styles.infoText}>{humidity}%</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoText}>Wind Speed</Text>
            <Text style={styles.infoText}>{speed}m/s</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor:'red',
    
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor:'red',
    
  },
  header: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 36,
    marginVertical: 10,
    fontFamily: "Helvetica",
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
    margin: 10,
  },
  info: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Helvetica",
    marginBottom: 10,
  },
});
