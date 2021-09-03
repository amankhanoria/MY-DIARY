import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, TextInput, View,Text,ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import {
  heightPercentageToDP as hp,widthPercentageToDP as wp,
  listenOrientationChange,
  removeOrientationListener,
} from 'react-native-responsive-screen';

import If from '../../components/If';
// import {lComponentStyles, pComponentStyles, Typography} from '../'
//import CustomText from '../components/CustomText';
import Container from '../Container';
import Validators from '../../../utils/Validators';
import {Utils} from '../../../utils/Utils';
import CustomButton from '../../components/CustomButton';
import { connect } from 'react-redux';


import { RootReducerState } from '../../redux/reducers';
import { AuthRepositry } from '../../services/AuthRepositry';







interface State {
  // decleration 
  form: {
    inputEmail: string;
    inputPassword: string;
  };
  orientation: string
}

interface Props {
  login : any;
  loggingIn : boolean;
}

// enum InputType{
//   EMAIL = 'email',
//   PASSWORD = 'password'
// }

class Login extends React.Component<Props, State>{

  private passwordInputRef;

  constructor(props) {
    super(props)
    this.state = {
      //initialize
      form: {
        inputEmail: '',
        inputPassword: '',
      },
      orientation: 'portrait'
    };
  }
  // pre-built
  componentDidMount(): void {
    listenOrientationChange(this)// it will generate a value
  }
  componentWillUnmount(): void {
    removeOrientationListener()

  }

  // updateInputText =(val, type) => {
  //   console.log(val)
  //   switch(type){
  //     case InputType.EMAIL:
  //       this.setState({form:{...this.state.form,inputEmail:val}});
  //       break;
  //     case InputType.PASSWORD:
  //       this.setState({form:{...this.state.form, inputPassword:val}});
  //       break;
  //   } 
  // }

  // handleFuction(){
  //     console.log("Login");
  //    }

  onLogin = (values) => {
    this.props.login({
      email: values.inputEmail,
      password: values.inputPassword,
      returnSecureToken: true,
    });
  };

  render() {
    //  console.log(this.state)
    //console.log(Platform.OS)

    const pStyles = portraitStyles();
    const lStyles = landScapeStyles();
    return (
      // <View>
      <Container
        containerStyles={{alignItems: 'center', backgroundColor:'skyblue'}}>
        {/* <TextInput onChangeText = {()=>this.updateText()}> */}
        {/* Text, TextInput */}

        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}}> */}

        <Text style={{ fontSize: 30, marginBottom: 10, letterSpacing: 5 }}>Login</Text>
        
        <Formik
          initialValues={this.state.form}
          // isInitialValid ={false} 
          validateOnMount={true}
          validateOnChange={true}

          onSubmit={values=> this.onLogin(values)}
          validationSchema={Validators.loginValidators}>

          {/* depricated   */}
          {/* render={props=>{ */}

          {props => {
            // console.log(props) 
            return (
              <View style={{ alignItems: 'center' }}>

                <TextInput
                  // to change the keyboardtype
                  onSubmitEditing={() => this.passwordInputRef.focus()}
                  returnKeyType={'next'}
                  onBlur={() => props.setFieldTouched('inputEmail')}

                  // onChangeText = {(val)=>this.updateInputText(val, InputType.EMAIL)}
                  onChangeText={props.handleChange('inputEmail')}

                  // style={this.state.orientation==='portrait'?
                  // pStyles.textInputStyle:lStyles.textInputStyle}

                  style={Utils.dynamicStyles(pStyles.textInputStyle, lStyles.textInputStyle, this.state.orientation)}

                  placeholder={'Enter your Email '}
                  // value = {this.state.form.inputEmail}
                  value={props.values.inputEmail}/>
                {/* Readability and Single Responsibility principle */}
                <If show={props.dirty && props.touched.inputEmail}>
                  <Text style={{ color: 'red' }}>{props.errors.inputEmail}</Text>
                </If>

                <TextInput
                  // to change the keyboardtype
                  // onSubmitEditing ={()=> this.handleFuction}
                  secureTextEntry={true}
                  onSubmitEditing={() => {
                    if (props.isValid) {
                      console.log('is valid')
                    } else {
                      console.log('form is not valid')
                    }
                  }}
                  // worked with touched property and control the function when u leave the textinput
                  onBlur={() => props.setFieldTouched('inputPassword')}
                  ref={ref => this.passwordInputRef = ref}
                  returnKeyType={'done'}

                  // onChangeText = {(val)=>this.updateInputText(val, InputType.PASSWORD)}
                  onChangeText={props.handleChange('inputPassword')}

                  // style={this.state.orientation==='portrait'?
                  // pStyles.textInputStyle : lStyles.textInputStyle}

                  style={Utils.dynamicStyles(pStyles.textInputStyle, lStyles.textInputStyle, this.state.orientation)}

                  placeholder={'Enter your Password'}
                  // value = {this.state.form.inputPassword}
                  value={props.values.inputPassword}
                />
                { /* {props.dirty && props.touched.inputPassword ? (
                    <Text style={{color:'red'}}>{props.errors.inputPassword}</Text>):null} */}
                <If show={props.dirty && props.touched.inputPassword}>
                  <Text style={{ color: 'red' }}>{props.errors.inputPassword}</Text>
                </If>
                <CustomButton
                  useIcon={true}
                      // iconName: <Icon name={'add'} />,
                      // iconName={Platform.OS === 'android' ? 'md-key' : 'ios-key'}
                  iconName={'key'}
                  disabled={!props.isValid}
                  title={'Login'}
                  onPress={() => {
                    if (props.isValid) {
                      console.log('is valid')
                      return props.handleSubmit();
                    } else {
                      console.log('form is not valid')
                    }
                  }}
                />
                <If show={this.props.loggingIn}>
                  <ActivityIndicator color = {'red'} size={'large'}/>
                </If>
                {/* for android- md / for ios - ios */}
                {/* <Icons name={'md-add-circle'} size={40}></Icons> */}
              </View>
            )
          }
        }
        </Formik>
         {/* </ScrollView> */}
      </Container>
    );
  }
}
const portraitStyles = () => StyleSheet.create({
  textInputStyle: {
    // width:300,
    width: wp('70%'),
    borderWidth: 1,
    marginBottom: 10,
    color:'#000',
  }
});

const landScapeStyles = () => StyleSheet.create({
  textInputStyle: {
    ...portraitStyles, width: wp('50%'),
  }
});

const mapDispatchToProps = dispatch =>({
  login : (data)=> dispatch(AuthRepositry.login(data))
})

const mapStateToProps = (state: RootReducerState) => ({
  loggingIn: state.userReducer.loggingIn,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

// style={{flex:1, justifyContent:"center", alignItems:"center"}}