import * as React from "react";
import {widthPercentageToDP as wp,heightPercentageToDP as hp, listenOrientationChange,removeOrientationListener, heightPercentageToDP} from 'react-native-responsive-screen';
import {View,Text,Image, StyleSheet,TouchableOpacity} from 'react-native';
import { Utils } from "../../utils/Utils";
import DateNTime from "./DateAndTime";
import { DiaryItem as diaryItem} from "../model/DIaryItem";


export interface Props {
    diaryItem: diaryItem;
    onPress : any;
  }
  
  const DiaryItem = (props: Props) => {
    const [imageExist, updateImageExist] = React.useState(true);
  
    return (
      <TouchableOpacity onPress={props.onPress}
        activeOpacity={0.6}
        style={{marginBottom: hp('1%'), padding: 15}}>
        {/*// date and time view */}
        
        <DateNTime timeStamp={props.diaryItem.timeStamp} />
    
        <View style={{flexDirection: 'row'}}>
          {/*// subject and description view */}
          <View style={{width: wp('70%'), marginRight: wp('1.5%')}}>
            <Text
              style={{color: 'blue', fontWeight: 'bold'}}>
              {props.diaryItem.subject}
            </Text>
            <Text numberOfLines={3} style={{marginRight: wp('2%')}}>
              {props.diaryItem.description}
            </Text>
          </View>
          {/*// image*/}
          {/* <Image
            style={{height: hp('10%'), borderRadius: 5, width: wp('22%')}}
            source={Utils.images.DIARY_THUMBNAIL}
          /> */}
  
          <Image
            onError={() => updateImageExist(false)}
            style={{height: hp('10%'), borderRadius: 5, width: wp('22%')}}
            source={
              imageExist
                ? {uri: props.diaryItem.images ? props.diaryItem.images[0] : 'no image saved'}
                : Utils.images.DIARY_THUMBNAIL
            }
          />    
        </View>
      </TouchableOpacity>
    );
  };
  DiaryItem.defaultProps = {};
  
  const styles = StyleSheet.create({
    dateNTimeText: {color: 'red', fontWeight: 'bold'},
  });
  export default DiaryItem;
  
  