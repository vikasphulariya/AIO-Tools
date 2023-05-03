// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";

const API_KEY = "41ab54f4e064087df0f55ee8cef30e3a";

export default function WeatherHome() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setloaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setloaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      console.log("vikas");
      const response = await fetch(API);
      console.log("viki", response, API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.log("jyoti");
        setWeatherData(null);
      }
      setloaded(true);
    } catch (error) {
      console.log("ajay");
      console.log("error");
    }
  }
  useEffect(() => {
    fetchWeatherData("Kharar");
    console.log("weatherData", loaded);
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return(

      <View>
      <SearchBar fetchWeatherData={fetchWeatherData} />
      <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
    </View>
      )
  }
  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    margin: 20,
    fontSize: 28,
    alignSelf:'center'
  },
});
