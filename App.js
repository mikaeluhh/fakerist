import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import generateData from "./services/firebase/generateData";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);
    generateData(() => setIsLoading(false)); // Call setIsLoading(false) when data generation is done
    setTimeout(() => setIsLoading(false), 5000); // Stop loading indicator after 5 seconds
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} disabled={isLoading}>
        <View
          style={{
            ...styles.btn,
            backgroundColor: isLoading ? "#787276" : "#808080",
          }}
        >
          {isLoading && <ActivityIndicator size="large" color="#C5C6D0" />}
          <Text style={styles.txt}>{isLoading ? "SCANNING" : "SCAN"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: 100,
    width: 350,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
  txt: {
    fontSize: 50,
    color: "#C5C6D0",
    fontWeight: "bold",
  },
});
