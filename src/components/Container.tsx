import * as React from "react";
	import {View,ViewStyle,StyleSheet} from 'react-native'

interface Props{
      children : any;				// children default property of prop
      containerStyles?:ViewStyle | ViewStyle[];	// used for when we need more than one styles
}
//	? = used to that it is not compulsory (and will be used only when we need multiple styles), otherwise it shows error

// this function works as a reusable fuctional components for all other a apps and components
const Container = (props:Props)=>{
	return<View style = {[styles.container, props.containerStyles]}>
            {props.children} 
            </View>
};

const styles = StyleSheet.create({
  container:{
      flex : 1,
      justifyContent: 'center',
      alignItems:"stretch",
     }
})

export default Container;