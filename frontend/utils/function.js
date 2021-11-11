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

