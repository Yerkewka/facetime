import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const RoundedButton = ({
  title,
  size = 125,
  style = {},
  titleStyle = {},
  onPress,
  ...props
}) => {
  return (<TouchableOpacity style={[styles(size).radius, style]} onPress={onPress}>
    <Text style={[styles(size).text, titleStyle]}>
      {title}
    </Text>
  </TouchableOpacity>)
}

const styles = (size) => StyleSheet.create({
  radius: {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    borderWidth: 2
  },
  text: {
    color: colors.white,
    fontSize: size / 3
  }
})