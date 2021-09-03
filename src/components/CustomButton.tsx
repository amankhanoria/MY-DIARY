import * as React from 'react';
import {
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,    
    StyleSheet,
} from 'react-native';
import Icon from './Icons';

import If from './If';

export interface Props {
    title: string;
    disabled?: boolean;
    buttonStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    onPress: any;

    useIcon: boolean;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
  }
  
  const CustomButton = (props: Props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[props.disabled?{...styles.buttonStyle,backgroundColor:'grey'}:styles.buttonStyle, props.buttonStyle]}
        disabled={props.disabled}>

        <If show={props.useIcon}>
          <Icon
          name={props.iconName}
          size={props.iconSize}
          color={props.iconColor}/>
          </If>

        <Text style={[styles.textStyle, props.textStyle]}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  CustomButton.defaultProps = {
    disabled: false,
    useIcon: false,
    iconSize: 30,
    iconColor: 'white',
  };
  
  CustomButton.defaultProps = {
    disabled: false,
    useIcons: false,
    iconSize: 35,
    iconColor: 'white', 
  };
  
  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: 'blue',
      borderRadius: 5,
      width: 120,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: 'white',
      textAlign: 'center',
      padding:10
    },
  });
  export default CustomButton;