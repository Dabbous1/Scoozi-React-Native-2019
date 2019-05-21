import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Router, Scene, Stack } from "react-native-router-flux";
import { WelcomeScene } from "./scenes";
import { SafeAreaView } from "react-navigation";
import colors from "./common/colors";
export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Router>
          <Stack hideNavBar key={"root"}>
            <Scene key={"welcome"} component={WelcomeScene} />
          </Stack>
        </Router>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.statusBar
  }
});
