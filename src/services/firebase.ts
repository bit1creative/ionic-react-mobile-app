import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5amLmJQByH8d9_yqTCCQbdsG91f-JtxY",
  authDomain: "mindly-f4612.firebaseapp.com",
  projectId: "mindly-f4612",
  storageBucket: "mindly-f4612.appspot.com",
  messagingSenderId: "955094268080",
  appId: "1:955094268080:web:5e6a69dfd1d743bd976375",
  measurementId: "G-D1XHMBMFWP",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const getPsychologistsFromFirestore = async () => {
  // берем данные с файрстора
  const docRef = firebase.firestore().collection("psychologists");

  const psychologists = await docRef.get().then((querySnapshot) => {
    const items: any[] = [];
    querySnapshot.forEach((doc) => {
      items.push({
        ...doc.data(),
        _id: doc.id,
      });
    });
    return items;
  });
  return psychologists;
};

// для упрощение работы, в файрсторе я сохраняю психолога, дату и время как стринги и как индексы

export const getSavedInfoFromFirestore = async () => {
  // берем данные с файрстора
  const docRef = firebase.firestore().collection("savedInfo");

  const savedInfo = await docRef.get().then((querySnapshot) => {
    const items: any[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  });
  return savedInfo[0];
};

export const setRecord = (
  psychologistId: string,
  psychologistIndex: number,
  time: string,
  timeIndex: number,
  date: string,
  dateIndex: number
) => {
  firebase.firestore().collection("savedInfo").doc("savedRecord").set({
    psychologistId,
    time,
    date,
    psychologistIndex,
    timeIndex,
    dateIndex,
  });
};
