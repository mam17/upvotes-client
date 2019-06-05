import React, { Component } from "react";
import { View } from 'react-native'
import { applyMiddleware, compose, createStore } from "redux";
import { Provider, connect } from "react-redux";
import { Router } from 'react-native-router-flux'
// import SplashScreen from 'react-native-splash-screen'
import Reactotron from "./config/reactotronConfig";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import Reducers from "./ducks";
import Scenes from "./routes";
import DropdownAlert from "react-native-dropdownalert";
import DropDownHolder from './components/dropDownHolder'

const middlewares = applyMiddleware(multi, thunk, promise);
const ConnectedRouter = connect()(Router);

const store = createStore(
  Reducers,
  compose(
    middlewares,
    Reactotron.createEnhancer()
  )
);

class Index extends Component {
  componentDidMount() {
    // SplashScreen.hide();
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <ConnectedRouter scenes={Scenes} />
        </Provider>
        <DropdownAlert
          ref={ref => DropDownHolder.setDropDown(ref)}
          // warnColor={colors.warn}
          closeInterval={4000}
          updateStatusBar={false}
          translucent
          messageNumOfLines={3} />
      </View>
    );
  }
}

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_START
// }

export default Index
// export default codePush(codePushOptions)(Index);
