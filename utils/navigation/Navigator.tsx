import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {appStack, authStack} from './Routes';
import {connect} from 'react-redux';

import { RootReducerState } from '../../src/redux/reducers';
import { AsyncStorageService } from '../../src/services/AsyncStorage';
import { AuthRepositry } from '../../src/services/AuthRepositry';


interface Props {
  loggedIn: boolean;
  updateUser: any;
}

interface State {}

class Navigator extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const user = await AsyncStorageService.getUser();
    if (user) {
      this.props.updateUser(user);
    }
  }

  render() {
    return (
      <NavigationContainer>
        {this.props.loggedIn ? appStack() : authStack()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootReducerState) => ({
  loggedIn: state.userReducer.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(AuthRepositry.updateUser(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigator);
