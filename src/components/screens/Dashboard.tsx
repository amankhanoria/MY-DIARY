import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import Container from '../Container';
import DiaryList from '../DiaryList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import  If  from '../If';
import { FloatingAction } from 'react-native-floating-action';
import Icon from '../Icons';
// import ActionSheet from 'react-native-actionsheet';
// import ActionSheet from 'react-native-actions-sheet';
// import { Icon } from 'react-native-vector-icons/Icon';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import { DiaryItem } from '../../model/DIaryItem';
// import CreateOrEditDiaryItem from '../../modals/createoreditdiaryitem';
import {ScreenNames} from '../../../utils/navigation/Routes' 
import { connect } from 'react-redux';
import { DiaryActions } from '../../redux/action/DiaryActions';
import { RootReducerState } from '../../redux/reducers';
import CustomButton from '../CustomButton';
import Error from '../Error'
import { Repositry } from '../../services/Repositry';
import { AuthRepositry } from '../../services/AuthRepositry';





// import DiaryItem from '../component/DiaryItems';
interface Props {
  route:any;
  navigation:any;
  diaryItems: DiaryItem[];
  onDelete: any;
  getDiaryItems: any;
  diaryItemsLoading: boolean;
  diaryItemsLoaded: boolean;
  logout: any;
}

interface State {
  // diaryItems: DiaryItem[],
  // isModalVisible: boolean;
  selectedItem : DiaryItem;
  error: boolean;
  refreshing: boolean;

}

enum ActionTypes{
   VIEW,
   Edit, 
   Delete, 
   Cancel,
}

class Dashboard extends React.Component<Props,State> {
   private actionSheetRef:any;
  constructor(props) {
    super(props);
    this.state = {
      // diaryItems: [  
      //   {
      //     id:0,
      //     subject: 'my subject 1',
      //     date:'July 7, 2021 - Sat',
      //     time: '10:15 pm',
      //     description:
      //       'Today was one of my best day of life. Today was one of my best day of life. Today was one of my best day of life.  ',
      //   },
      //   {
      //     id:1,
      //     subject: 'my subject 2',
      //     date:'July 7, 2021 - Sat',
      //     time: '10:15 pm',
      //     description:
      //       'Today was one of my best day of life. Today was one of my best day of life. Today was one of my best day of life.  ',
      //   },
      // ],
      // isModalVisible: false,
      selectedItem :null,
      error:false,
      refreshing: false,
    };
  }
  async componentDidMount() {
    await this.fetchData();
  }
  async fetchData(force = false) {
    try {
      await this.props.getDiaryItems(
        {
          loading: this.props.diaryItemsLoading,
          loaded: this.props.diaryItemsLoaded,
        },
        force,
      );
    } catch (e) {
      this.setState({error: true, refreshing:false});
    }
  }
  onError = async () => {
    this.setState({error: false});
    await this.fetchData(true);
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.fetchData(true);
    this.setState({refreshing: false});
  };

  onLogout = () => {
    this.props.logout();
  };
  actions = [
    { 
      text: 'Add',
      name: 'add',
      icon: <Icon name={'add'} />,
      position: 1,
    },
  ];

    // addItem = val =>{
    //   const diaryItems = this.state.diaryItems;
    //   diaryItems.push(val);
    //     this.setState( {
    //       // diaryItems : diaryItems,
    //       diaryItems,
    //       isModalVisible: false,
    //     });
    // }

    // updateItem = val => {
    //   // const diaryItems = this.state.diaryItems;
    //   const filteredItems = this.deleteItemAndGetItems(val)
    //   filteredItems.push(val);
    //   this.setState({
    //     diaryItems: filteredItems,
    //     // isModalVisible: false,
    //     selectedItem: null,
    //   });
    // };

    handleActionButton = index => {
        switch(index){
          case ActionTypes.Cancel:{
            this.setState({selectedItem: null});
            break;
          }
          case ActionTypes.Edit:{
            // this.setState({isModalVisible: true});
            this.onAddOrUpdate()
            break;
          }
          case ActionTypes.VIEW:{
            this.onView();
            break;
          }
          case ActionTypes.Delete:{
            this.onDelete();
          }
        }
      // if (index == 3) {
      //   this.setState({selectedItem: null});
      // } else if (index === 1) {
      //   this.setState({isModalVisible: true});
      // }
    };

    onAddOrUpdate() {
      this.props.navigation.navigate(ScreenNames.EDIT_ADD_DIARY_ITEM, {
        diaryItem: this.state.selectedItem,
      });
      this.setState({selectedItem: null});
    }
    onDelete() {
      this.props.onDelete(this.state.selectedItem.id);
      this.setState({selectedItem: null});
    }
    onView(){
      this.props.navigation.navigate(ScreenNames.VIEW_DIARY_ITEM,{
        diaryItem:this.state.selectedItem,
    });
    this.setState({selectedItem:null});
    }

    
      // const diaryItems = this.state.diaryItems;
      // const filteredItems = diaryItems.filter(
      //   data => data.id !== this.state.selectedItem.id
      //   );
      // const filteredItems = this.deleteItemAndGetItems(this.state.selectedItem)
      //   this.setState({diaryItems:filteredItems, selectedItem:null}) 
        
        // this.setState({selectedItem:null});
    

    // deleteItemAndGetItems(item) : DiaryItem[]{
    //   const diaryItems = this.state.diaryItems;
    //   return diaryItems.filter(
    //     data => data.id !== item.id,
    //     );
    // }

  render() {
    // Reactotron.log('hello debugger', this.state.diaryItems)
    console.log(this.props.diaryItems)
    return (
      <Container
      containerStyles={{
        justifyContent: 'flex-start'
      }}>
        
      <If show={this.props.diaryItemsLoading}>
          <ActivityIndicator color = {'red'} size={'large'} />
      </If>

      <If show= {this.state.error}>
        <Error onPress={this.onError}/>
      </If>  

      <If show={!!this.props.diaryItems.length}>
          <DiaryList onRefresh={this.onRefresh}
          refreshing = {this.state.refreshing}
            onPress={(val: any) => {
              this.setState({selectedItem: val});
              this.actionSheetRef.show();}}
              diaryItems={this.props.diaryItems}/>
        <CustomButton onPress={this.onLogout} title={'Logout'} iconName={'key'}/>
      </If>



      <If show={!this.props.diaryItems.length&&this.props.diaryItemsLoaded}>
        <Text style={{width: wp('95%'), textAlign: 'center'}}>
          Currently, No Item is added. Please start adding Items
        </Text>
      </If>

      <FloatingAction
          actions={this.actions}
          onPressItem={name => {
            // this.setState({isModalVisible: true});
            this.onAddOrUpdate()
          }}
        />
        <ActionSheet
          ref={ref => (this.actionSheetRef = ref)}
          title={
            <Text style={{color: '#000', fontSize: 18}}>
              Which one do you like?
            </Text>
          }
          options={['View', 'Edit', 'Delete', 'Cancel']}
          cancelButtonIndex={3}
          destructiveButtonIndex={2}
          // onPress={index => {
          //   console.log(index, this.state.selectedItem);
          // }}
          onPress={this.handleActionButton}
        />

        {/* <CreateOrEditDiaryItem
          // onSave={this.addItem}
          // isVisible={this.state.isModalVisible}
          // onDismiss={() => {
          //   this.setState({isModalVisible: false});
          // }}

          onUpdate={this.updateItem}
          diaryItem={this.state.selectedItem}
          onSave={this.addItem}
          isVisible={this.state.isModalVisible}
          onDismiss={() => {
            this.setState({isModalVisible: false, selectedItem: null});
          }}
        /> */}
    </Container>
    );
  } 
}
const mapStateToProps = (state:RootReducerState) => ({
  diaryItems: state.diaryReducer.diaryItems,
  diaryItemsLoading: state.diaryReducer.loading,
  diaryItemsLoaded: state.diaryReducer.loaded,
});

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => dispatch(Repositry.deleteDiaryItem(id)),
    getDiaryItems: (status, force) =>
      dispatch(Repositry.getDiaryItems(status, force)),
         logout:()=>dispatch(AuthRepositry.logout()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

{/* componentDidMount(): void {} */}

     // <Container
      //   containerStyles={{justifyContent: 'flex-start', marginTop: hp('2%')}}>

      //   <ScrollView>
      //    <DiaryList diaryItems={this.state.diaryItems} />
      //   </ScrollView>
         
      // </Container>  