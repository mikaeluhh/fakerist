import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import generateData from "./services/firebase/generateData";
import resetDB from "./services/firebase/resetDB";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    setIsLoading(true);
    generateData(() => setIsLoading(false));
    setTimeout(() => setIsLoading(false), 5000);
  };

  const handleResetPress = () => {
    setShowModal(true);
  };

  const handleReset = () => {
    setShowModal(false);
    resetDB();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} disabled={isLoading}>
        <View style={styles.btn}>
          {isLoading && <ActivityIndicator size="large" color="#C5C6D0" />}
          <Text style={styles.txt}>{isLoading ? "SCANNING" : "SCAN"}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResetPress}>
        <View style={styles.resetbtn}>
          <Text style={styles.resetTxt}>RESET</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to reset the database?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleReset}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323F4B",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: 100,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1F2933",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  txt: {
    fontSize: 40,
    color: "#F5F7FA",
    fontWeight: "bold",
  },
  resetbtn: {
    height: 100,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1F2933",
    marginVertical: 20,
  },
  resetTxt: {
    fontSize: 40,
    color: "#FF6666",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#1F2933",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
