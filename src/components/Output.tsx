import { Text, View, ViewStyle, TextStyle } from 'react-native';
import React from 'react';

interface OutputProps {
  password: string;
  textStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
}

const Output = ({
  password,
  textStyle = {},
  wrapperStyle = {},
}: OutputProps) => {
  return (
    <View style={wrapperStyle}>
      <Text selectable={true} style={textStyle}>
        {password}
      </Text>
      <Text style={{ fontSize: 12, color: '#09627bff', marginTop: 2 }}>
        Long press to copy
      </Text>
    </View>
  );
};

export default Output;
