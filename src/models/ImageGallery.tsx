import * as React from "react";
import { Image, TouchableOpacity, View ,StyleSheet} from "react-native";
import ReactNativeModal from "react-native-modal";
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Utils } from "../../utils/Utils";
import ImageList from "../components/ImageList";



export interface Props{
    isVisible:boolean;
    onDismiss:any;
    images:any[];
    onImageDelete:any,
    onImageSelect:any;
}

const data=[
    Utils.images.DIARY_THUMBNAIL,
    Utils.images.DIARY_THUMBNAIL,
    
]

const ImageGallery=(props:Props)=>{
        // const selectImage=()=>{
        //     ImageCropPicker.openPicker({
        //         multiple:true,
        //     })
        //     .then(data=>{
        //         console.log(data);
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     });
        // };
    return(
        <ReactNativeModal
        isVisible={props.isVisible}
        onBackButtonPress={props.onDismiss}
        onBackdropPress={props.onDismiss}
        onDismiss={props.onDismiss}>
            <View style={styles.container}>
                <TouchableOpacity
                 onPress={props.onImageSelect}>
                    <Image style={styles.image} source={Utils.images.DIARY_THUMBNAIL}/>
                </TouchableOpacity>

                <ImageList onImageDelete={props.onImageDelete} images={props.images}/>
                </View>
                </ReactNativeModal>   
    );
    }

const styles=StyleSheet.create({
    container:{
        height:hp('40%'),
        alignItems:'center',
        justifyContent:'center',
    },
    image:{height:hp('20%'),width:wp('80%')},
});
ImageGallery.defaultProps={};

export default ImageGallery;