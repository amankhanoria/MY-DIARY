// import ReactNativeModal from "react-native-modal";
// import * as React from "react";
// import { View, TextInput, StyleSheet, KeyboardAvoidingView, ToastAndroid, ProgressViewIOSComponent} from 'react-native';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
// import { FloatingAction } from "react-native-floating-action";
// import Icon from "react-native-vector-icons/Ionicons";

// export interface Props{
//     onSave: any;
//     inVisible: boolean;
//     onDismiss: any;
//     diaryItem?: any;

//     onUpdate?: any;
// }

// const CreateDiaryItem=(props:Props)=>{


//     const [subjectTextInput, updateSubjectTextInput]=React.useState('');
//     const [descriptionTextInput, updateDescriptionInput]=React.useState('');

// // const actions=[{
// //     text: 'Add',
// //     name:'add',
// //     icon: <Icon name={'checkmark'}/>,
// //     position: 1
// //   }];

// const actions=[{
//     text: props.diaryItem ? 'Update':'Add',
//     name:props.diaryItem ? 'Update':'Add',
//     icon: <Icon name={'checkmark'}/>,
//     position: 1,
//   }];
//     // const onSave=()=>{
//     //     if(subjectTextInput===''&& descriptionTextInput===''){
//     //         return ToastAndroid.show(
//     //         'Subject and Descriptions Needed',
//     //             ToastAndroid.LONG,
//     //         );
//     //     }
//     //     const data={
//     //         subject: subjectTextInput,
//     //         description: descriptionTextInput,
//     //     };
//     //         return props.onSave(data);
        
//     // };

//     React.useEffect(()=>{
//         if(props.diaryItem){
//             updateSubjectTextInput(props.diaryItem.subject);
//             updateDescriptionInput(props.diaryItem.description);
//         }
//         else{
//             updateSubjectTextInput('');
//             updateDescriptionInput('');
//         }
//     },
//     [props.diaryItem]
//     );

//     const OnSaveOrUpdate=()=>{
//         if(subjectTextInput === '' && descriptionTextInput ===''){
//             return ToastAndroid.show('Subject and Descriptions Needed', ToastAndroid.LONG,
//             );
//     }
//     const data={
//         id : props.diaryItem ? props.diaryItem.id : Math.random(),
//         subject:subjectTextInput,
//         description: descriptionTextInput,
//     };
//     if(props.diaryItem){
//         return props.onUpdate(data);
//     }
//    return props.onSave(data);
// };
//     return(
//         <ReactNativeModal
//         style={{backgroundColor:'white',margin:0}}
//         onDismiss={props.onDismiss}
//         onBackButtonPress={props.onDismiss}
//             isVisible={props.inVisible}>

//             <View style={{flex:1}}>
//                 <TextInput
//                 value={subjectTextInput}
//                 onChangeText={val=> updateSubjectTextInput(val)}
//                 style={[styles.textInput,{borderBottomWidth:1}]}
//                 placeholder={'Enter Subject'}
//                 />
//                 <KeyboardAvoidingView>
//                     <TextInput
//                     value={descriptionTextInput}
//                     onChangeText={val=> updateDescriptionInput(val)}
//                     multiline={true}
//                     scrollEnabled={true}
//                     style={styles.textInput}
//                     placeholder={'Start writing'}
//                     />
//                 </KeyboardAvoidingView>
//                 </View>

//                 <FloatingAction
//                     actions={actions}
//                     onPressItem={OnSaveOrUpdate}/>
//                 </ReactNativeModal>
        
//     );
// };

// const styles=StyleSheet.create({
//     textInput:{
//         width:wp('100%'),
//         paddingBottom:10,
//     },
// });

// CreateDiaryItem.defaultProps={};
// export default CreateDiaryItem;

