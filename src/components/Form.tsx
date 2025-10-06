import React, { SetStateAction, useState } from 'react';
import {
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useFormik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { number, object } from 'yup';

const PassswordSchema = object().shape({
  passwordLength: number()
    .typeError('Must be a number!')
    .required('Length is required')
    .min(4, 'Length should be alteast 4 characters')
    .max(24, 'Length should be maximum 24 characters'),
});

interface FormProps {
  setPassword: React.Dispatch<SetStateAction<string>>;
  inputContainerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  inputBoxStyle?: TextStyle;
  inputLabelStyle?: TextStyle;
  footerContainer?: ViewStyle;
  footerWrapper?: ViewStyle;
  footerBtn?: ViewStyle;
  footerBtnText?: TextStyle;
  btnPrimary?: ViewStyle;
  btnSecondary?: ViewStyle;
  errorContainerStyle?: ViewStyle;
  errorTextStyle?: TextStyle;
}

const Form = ({
  setPassword,
  inputContainerStyle = {},
  wrapperStyle = {},
  inputBoxStyle = {},
  inputLabelStyle = {},
  footerContainer = {},
  footerWrapper = {},
  footerBtn = {},
  footerBtnText = {},
  btnPrimary = {},
  btnSecondary = {},
  errorContainerStyle = {},
  errorTextStyle = {},
}: FormProps) => {
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [specialChars, setSpecialChars] = useState(false);

  const form = useFormik({
    initialValues: {
      passwordLength: '',
    },
    validationSchema: PassswordSchema,
    onSubmit: values => {
      generatePassword(+values.passwordLength);
    },
  });

  function generatePassword(length: number): void {
    let charSet = '';

    if (lowercase) {
      charSet += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (uppercase) {
      charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (digits) {
      charSet += '0123456789';
    }

    if (specialChars) {
      charSet += '!@#$%^&*()_-+=*/-?/|:;~`';
    }

    let generatedPassword = createPassword(charSet, length);
    setPassword(generatedPassword);
  }

  function createPassword(charset: string, length: number): string {
    let pass = '';

    for (let i = 0; i < length; i++) {
      let randIndex = Math.round(Math.random() * charset.length);
      pass += charset.charAt(randIndex);
    }

    return pass;
  }

  function resetStates() {
    setLowercase(true);
    setUppercase(false);
    setDigits(false);
    setSpecialChars(false);
    setPassword('');
  }

  return (
    <View style={wrapperStyle}>
      <View>
        <View style={inputContainerStyle}>
          <Text style={inputLabelStyle}>Password Length: </Text>
          <TextInput
            style={inputBoxStyle}
            keyboardType="numeric"
            placeholder="eg. 8"
            value={`${form.values.passwordLength}`}
            defaultValue=""
            onChangeText={form.handleChange('passwordLength')}
          />
        </View>
        {form.touched.passwordLength && form.errors.passwordLength && (
          <View style={errorContainerStyle}>
            <Text style={errorTextStyle}> {form.errors.passwordLength}</Text>
          </View>
        )}
      </View>

      <View>
        <View style={inputContainerStyle}>
          <Text style={inputLabelStyle}>Include Lowercase </Text>
          <View>
            <BouncyCheckbox
              fillColor="#189ec3ff"
              isChecked={lowercase}
              useBuiltInState={false}
              onPress={prev => setLowercase(!prev)}
            />
          </View>
        </View>
      </View>
      <View>
        <View style={inputContainerStyle}>
          <Text style={inputLabelStyle}>Include Uppercase </Text>
          <View>
            <BouncyCheckbox
              fillColor="#189ec3ff"
              isChecked={uppercase}
              useBuiltInState={false}
              onPress={prev => setUppercase(!prev)}
            />
          </View>
        </View>
      </View>
      <View>
        <View style={inputContainerStyle}>
          <Text style={inputLabelStyle}>Include Digits </Text>
          <View>
            <BouncyCheckbox
              fillColor="#189ec3ff"
              isChecked={digits}
              useBuiltInState={false}
              onPress={prev => setDigits(!prev)}
            />
          </View>
        </View>
      </View>
      <View>
        <View style={inputContainerStyle}>
          <Text style={inputLabelStyle}>Include Special Characters </Text>
          <View>
            <BouncyCheckbox
              fillColor="#189ec3ff"
              isChecked={specialChars}
              useBuiltInState={false}
              onPress={prev => setSpecialChars(!prev)}
            />
          </View>
        </View>
      </View>

      <View style={footerContainer}>
        <View style={footerWrapper}>
          <TouchableOpacity
            style={[footerBtn, btnPrimary]}
            onPress={form.handleSubmit}
          >
            <Text style={footerBtnText}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[footerBtn, btnSecondary]}
            onPress={() => {
              // @ts-ignore
              form.handleReset();
              resetStates();
            }}
          >
            <Text style={footerBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Form;
