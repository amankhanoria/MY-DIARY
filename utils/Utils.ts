import{ViewStyle,TextStyle,ImageStyle,Platform } from "react-native";
//this is generic class which is used dynamically in any screen
export class Utils{
    static dynamicStyles(
        portraitStyles:
        ViewStyle
        |ViewStyle[]
        |TextStyle
        |TextStyle[]
        |ImageStyle
        |ImageStyle[],
        landScapeStyles:
        ViewStyle
        |ViewStyle[]
        |TextStyle
        |TextStyle[]
        |ImageStyle
        |ImageStyle[],
        orientation:string)
        {
            return orientation === 'portrait'?portraitStyles:landScapeStyles;
        }
        static isIos(){
            return Platform.OS === 'ios';
        }

        
        
static images={
    DIARY_THUMBNAIL: require('../src/assets/add-image.jpg'),
     ADD_IMAGE:require('../src/assets/add-image.jpg')
}
    }

 