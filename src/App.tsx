import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Form from './components/Form';
import Output from './components/Output';

const App = () => {
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.appWrapper}>
        <View style={styles.header}>
          <Text style={styles.heading}>Password Generator</Text>
        </View>
        {password && (
          <Output
            password={password}
            textStyle={styles.outputTextStyle}
            wrapperStyle={styles.outputWrapperStyle}
          />
        )}
        <Form
          setPassword={setPassword}
          inputContainerStyle={styles.inputContainerStyle}
          footerContainer={styles.footerContainerStyle}
          footerWrapper={styles.footerWrapperStyles}
          inputBoxStyle={styles.inputBoxStyle}
          footerBtn={styles.footerBtnStyle}
          btnPrimary={styles.btnPrimary}
          btnSecondary={styles.btnSecondary}
          errorContainerStyle={styles.errorContainerStyle}
          errorTextStyle={styles.errorTextStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  appWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e7fffdff',
    padding: 20,
  },
  header: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 500,
    textAlign: 'center',
  },
  outputTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  outputWrapperStyle: {
    backgroundColor: '#d6f5ffff',
    padding: 16,
    margin: 4,
    width: '100%',
    borderRadius: 10,
    elevation: 1,
  },
  inputContainerStyle: {
    marginTop: 12,
    // backgroundColor: '#e5effeff',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerContainerStyle: {
    marginTop: 20,
    padding: 20,
  },
  footerWrapperStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  inputBoxStyle: {
    backgroundColor: '#ffffffff',
    width: '40%',
  },
  footerBtnStyle: {
    width: '40%',
    padding: 20,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: '#aae0ffff',
  },
  btnSecondary: {
    backgroundColor: '#f4e3ffff',
  },
  errorContainerStyle: {
    paddingHorizontal: 16,
    marginVertical: 1,
  },
  errorTextStyle: {
    color: 'rgba(255, 123, 123, 1)',
  },
});
