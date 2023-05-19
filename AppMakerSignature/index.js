import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class AppMakerSignature extends React.Component {
  render() {
    return (
      <View style={styles.button}>
        <Text style={styles.text}>Made By Junaid</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    height: 25,
    width: 130,
    alignSelf: "center",
    marginTop: 30,
    alignItems: "center",
    borderRadius: 20,
  },
  text:{
fontWeight:"bold",
marginTop:3
  }
});
