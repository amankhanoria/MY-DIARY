
import * as React from "react";
import DiaryItem from "./DiaryItems";

import{FlatList,RefreshControl} from "react-native";

export interface Props{
    diaryItems: any[];
    onPress: any;
    onRefresh: any;
  refreshing: boolean;
}

const DiaryList=(props:Props)=>{
    return(
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(index)=> index.toString()}
            data={props.diaryItems}
            extraData={props}

            refreshControl={
                <RefreshControl
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
                />
            }

            renderItem={data=>{
            return <DiaryItem onPress={()=>{props.onPress(data.item)}}diaryItem={data.item} />;
            }} 
/>

         );
}
DiaryList.defaultProps={};
export default DiaryList

// {props.diaryItems.map((diaryItem, index)=>{
//     return <DiaryItem diaryItem={diaryItem} index={index}/>;
// })}