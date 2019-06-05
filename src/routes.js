import React, { Component } from "react";
import { Scene, Stack, Tabs, Actions } from "react-native-router-flux";
import Home from './views/home'
import Header from './components/header'

const Scenes = Actions.create(
  <Stack key="root">
    <Scene
      key="home"
      panHandlers={null}
      component={Home}
      navBar={Header}
    />
  </Stack>
)

export default Scenes;
