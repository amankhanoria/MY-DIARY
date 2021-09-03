import * as React from "react";
import Navigator from './utils/navigation/Navigator';
import {Provider} from 'react-redux';
import Reactotron from 'reactotron-react-native' 
import Store from './src/redux/reducers';
interface Props{
}
interface State{
}
class App extends React.Component<Props, State>{
  constructor(props:string) {
    super(props)
    this.configureReactotron()
    // (console as any).tron.log = Reactotron;
  }

  configureReactotron(){
    Reactotron.clear();
    return Reactotron.configure({
      host : '192.168.43.30',
      port : 9090,
      name : 'addition',
    }).connect();
  }
   render() {
      return (
         <Provider store={Store} >
         <Navigator/>
        </Provider>
      );
  };

}
export default App;


// style={{flex:1, justifyContent:"center", alignItems:"center"}}