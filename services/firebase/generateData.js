import { getDatabase, ref, set } from "firebase/database";
import app from "./firebaseConfig";

let scanCounter = 1;

export default function generateData() {
  const db = getDatabase(app);
  // const scanRef = ref(db, "Scans/");

  // const scanID = `scan_${scanCounter < 10 ? "0" : ""}${scanCounter}`;
  // scanCounter++;


  const currentDate = new Date();
  const options = { timeZone: "Asia/Manila" };
  currentDate.toLocaleString("en-US", options);

  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const currentDatetime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  const timeData = [];
  for (let i = 0; i < 2000; i++) {
    const timeValue = i * 2.5e-3;
    timeData.push(timeValue);
  }

  const amplitudeData = [];
  for (let i = 0; i < 2000; i++) {
    const sign = Math.random() < 0.5 ? -1 : 1;
    const value = Math.random() * 20 - 10;
    const amplitudeValue = sign * value * Math.pow(10, -4);
    amplitudeData.push(amplitudeValue);
  }

  const qualityData = Math.random() < 0.5 ? "good" : "bad";

  const frequencyData = "1MHz";
  const voltageData = "110V";

  const fakeUsonicData = {
    Timestamp: currentDatetime,
    time: timeData,
    amplitude: amplitudeData,
    quality: qualityData,
    freq: frequencyData,
    voltage: voltageData,
  };

  const scanID = `scan_${scanCounter < 10 ? "0" : ""}${scanCounter}`;
  scanCounter++;

  const scanRef = ref(db, `Scans/${scanID}`);
  set(scanRef, fakeUsonicData);
}
