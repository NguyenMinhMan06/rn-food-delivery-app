import moment from "moment";
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'

export const objectIsNull = object => {
  if (object === null || object === undefined) {
    return true;
  } else {
    return false;
  }
};

export const arrayIsEmpty = array => {
  if (objectIsNull(array) || array.length === 0) {
    return true;
  } else {
    return false;
  }
};
export const addDays = (date, days) => {
  var result = new Date(moment(date).endOf('day'));
  result.setDate(result.getDate() + days);
  return result;
}

export const dateNow = () => {
  var result = new Date()
  return result
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const showToast = (message) => {
  return (
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  )
};

export function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

