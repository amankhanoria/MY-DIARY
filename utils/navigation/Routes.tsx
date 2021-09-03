

import * as React from "react";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dashboard from "../../src/components/screens/Dashboard";
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../src/components/screens/Login'
import ViewDiaryItem from '../../src/components/screens/ViewDiaryItem'

import EditOrAddItem from '../../src/components/screens/EditOrAdditems';

const Stack = createStackNavigator();


export enum ScreenNames {
    LOGIN = 'Login',
    DASHBOARD = 'Daschboard',
    VIEW_DIARY_ITEM = "view_diary_item",
    EDIT_ADD_DIARY_ITEM="add or edit diary item"
}
export const authStack=()=>{
    return(
        <Stack.Navigator initialRouteName={ScreenNames.LOGIN}>
        <Stack.Screen name={ScreenNames.LOGIN} component={Login}/>
        </Stack.Navigator>
    )
}
export const appStack=()=>{
    return(
        <Stack.Navigator 
        initialRouteName={ScreenNames.DASHBOARD}
            screenOptions={{
                headerStyle:{
                    backgroundColor:'blue',
                    height: hp('7%'),
                },
                headerTitleStyle: {
                    color:'white',
                },
                title:'My Diary',
            }
            }>
                <Stack.Screen name={ScreenNames.DASHBOARD} component={Dashboard}/>

                <Stack.Screen
                options={{title:'View', headerTintColor:'grey'}}
                name={ScreenNames.VIEW_DIARY_ITEM} component={ViewDiaryItem}/>

                <Stack.Screen options={({route})=>{
                    return {
                        title:(route.params as any).diaryItem ? 'Edit':'Add',
                    headerTintColor:'grey',                     }
                }}
                name={ScreenNames.EDIT_ADD_DIARY_ITEM} component={EditOrAddItem}/>
                </Stack.Navigator>
    )
}