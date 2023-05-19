import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
  Linking,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import axios from 'axios';


export default class DailyPicScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      apods: [],
      screen: "default",
    };
  }

  componentDidMount() {
    this.getApod();
  }

  getApod = async () => {
    const key = "xHvTdyAcoQT9ZZPQ0HOnbFAXMNpneGhi80iPbx9e";
    const path = "https://api.nasa.gov/planetary/apod?api_key=" + key;

    axios
      .get(path)
      .then((response) => {
        this.setState({ apods: response.data });
      })
      .catch((errors) => {
        setTimeout(function () {
          this.setState({ screen: "loading" });
        }, 2000);
        this.setState({ screen: "error" });
      });
  };

  render() {
    if (this.state.screen === "loading") {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.loading}>Loading . . . </Text>
        </View>
      );
    } else if (this.state.screen === "default") {
      if (this.state.apods === "") {
        this.setState({ screen: "loading" });
      }
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={require("../assets/stars.gif")}
            style={styles.backgroundImage}>
            <View
              style={{
                flex: 0.15,
                justifyContent: "center",
                textAlign: "center",
              }}>
              <Text style={styles.routeText}>Daily Pic</Text>
            </View>
            <ScrollView style={styles.listContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(this.state.apods.url).catch((err) =>
                    console.error("Couldn't load page", err)
                  )
                }>
                <Image
                  source={{ uri: this.state.apods.hdurl }}
                  style={{
                    width: "100%",
                    height: 300,
                    borderRadius: 10,
                  }}></Image>
              </TouchableOpacity>
              <View style={{ padding: 20 }}>
                <Text style={styles.titleText}>{this.state.apods.title}</Text>
                <Text style={styles.explanationText}>
                  {this.state.apods.explanation}
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.error}>Something Went Wrong</Text>
          <Text style={styles.kaomoji}>¯\_(ツ)_/¯</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  error: {
    fontSize: 60,
    fontWeight: "bold",
    color: "red",
    marginLeft: 30,
    marginTop: -50,
  },
  kaomoji: {
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  routeText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ec63ff",
  },
  explanationText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  listContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    flex: 0.8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
  },
});
