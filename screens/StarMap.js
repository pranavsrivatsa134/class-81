import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

export default class StarMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoLocation: false,
      location: {
        lat: null,
        lon: null,
      },
      path: "",
      inputDeactivator: true,
    };
  }

  componentDidMount(){
    if(this.state.path === ''){
      this.setState({ path: "https://virtualsky.lco.global/embed/index.html?longitude=77.5889574&latitude=14.6839958&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true" });
    }

  }

  autoGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    let lat = await location.coords.latitude;
    let lon = await location.coords.longitude;

    if (status !== "granted") {
      Alert.alert("Give permission to access your device location");
    }

    

    if (
      this.state.autoLocation === true &&
      status === "granted" &&
      this.state.inputDeactivator === false
    ) {
      this.setState({
        location: {
          lat: lat,
          lon: lon,
        },
      });
      ToastAndroid.show("You arrived to your location", ToastAndroid.SHORT);
      this.getConstellationsApi();
    }
  };

  getConstellationsApi = () => {
    const path =
      "https://virtualsky.lco.global/embed/index.html?longitude=" +
      this.state.location.lon +
      "&latitude=" +
      this.state.location.lat +
      "&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true";

    this.setState({ path: path });
    console.log(path);
  };

  launchAuto = (state) => {
    this.setState({
      autoLocation: state,
      inputDeactivator: false,
    });
    this.autoGetLocation();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#1a0023" }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={{ flex: 0.3, marginTop: 20, alignItems: "center" }}>
          <Text style={styles.titleText}>Star Map</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your longitude"
            placeholderTextColor="white"
            editable={this.state.inputDeactivator}
            onChangeText={(text) => {
              this.setState({
                lon: text,
              });
            }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your latitude"
            placeholderTextColor="white"
            editable={this.state.inputDeactivator}
            onChangeText={(text) => {
              this.setState({
                lat: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.gps_button}
            onPress={() => {
              this.launchAuto(true)
              ToastAndroid.show("Going to your location . . .", ToastAndroid.SHORT);
            }}>
            <Image source={require("../assets/gps.png")} style={styles.gps} />
          </TouchableOpacity>
        </View>
        <WebView
          scalesPageToFit={true}
          source={{ uri: this.state.path }}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
  },
  inputStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    textAlign: "center",
    color: "white",
    width: 200,
  },
  gps: {
    width: 30,
    height: 30,
  },
  gps_button: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: -70,
    marginLeft: 280,
  },
});
