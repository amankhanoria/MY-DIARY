import React from 'react';
import {View, TextInput, Text, StyleSheet, Platform} from 'react-native';
import { Utils } from '../../utils/Utils';
import Icons from 'react-native-vector-icons/Ionicons'


export interface Props{
    name: string,
    color?: string,
    size?: number,
    style?: any,
    noPrefix?: boolean;
}
const Icon = (props: Props)=>{
    const iconName=()=>{
        if(Utils.isIos()){
            return 'ios-'+ props.name;
        }
        return 'md-' +props.name;   
     };
        return(
            <Icons
            style={props.style}
            name={props.noPrefix? props.name:iconName()}
            color={props.color}
            size={props.size}
            />
            );
};
Icon.defaultProps={
    color: 'white',
    size: 35,
    noPrefix: false,
}
export default Icon;

