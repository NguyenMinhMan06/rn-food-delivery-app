import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimentions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FA5 from 'react-native-vector-icons/FontAwesome5'


const FormInput = ({ labelValue, placeholderText, iconType, iconPassword, passCheck, ...rest }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {iconPassword ? <TouchableOpacity style={styles.iconStyle} onPress={() => { setSecureTextEntry(!secureTextEntry) }}>
        <FA5 name={secureTextEntry ? "eye-slash" : "eye"} size={25} color="#666" />
      </TouchableOpacity> : null}
      {passCheck ? <View style={styles.iconStyle}>
        {labelValue === passCheck ? <FA5 name={"check"} size={25} color="green" /> : null}
      </View> : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
