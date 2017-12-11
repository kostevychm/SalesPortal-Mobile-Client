import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'



import {
  Animated,
  StyleSheet,
  View,
  NavigationExperimental,
  StatusBar,
  Platform
} from 'react-native';
import Home from './Home';
import Detail from './Detail';
import DetailEstabl from './DetailEstabl';

import ApplicationTabs from './ApplicationTabs';
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const {
  PropTypes: NavigationPropTypes,
  StateUtils: NavigationStateUtils,
  Card: NavigationCard,
  Transitioner: NavigationTransitioner,
} = NavigationExperimental;

const {
  PagerStyleInterpolator: NavigationPagerStyleInterpolator,
} = NavigationCard;

class AppContainer extends Component {

  constructor(props: any, context: any) {
    super(props, context);
    this._render = this._render.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  render() {
   return (
      <NavigationTransitioner
        navigationState={this.props.navigationState}
        render={this._render}
      />
    );
  }

  _render(transitionProps) {
    const scenes = transitionProps.scenes.map((scene) => {
      const sceneProps = {
        ...transitionProps,
        scene,
      };
      return this._renderScene(sceneProps);
    });

    return (
      <View style={ { flex: 1 } }>
        <View style={styles.containerTop}>
        <MyStatusBar backgroundColor="#4687c1" barStyle="light-content" />

        <View style={styles.contentTop} />
      </View>
        {scenes}
      </View>
    );
  }

  _renderScene(sceneProps) {
    return (
      <SceneContainer
        {...sceneProps}
        key={sceneProps.scene.key}
      />
    )
  }
}

class SceneContainer extends Component {

  render() {
    const style = [
      styles.scene,
      NavigationPagerStyleInterpolator.forHorizontal(this.props),
    ];
    let Scene = null;
    if (this.props.scene.route.key === 'ApplicationTabs') { Scene = ApplicationTabs }
    if (this.props.scene.route.key === 'Detail') { Scene = Detail }
    if (this.props.scene.route.key === 'DetailEstabl') { Scene = DetailEstabl }


    return  (
      <Animated.View style={style}>
        <Scene {...this.props} style={style} />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  containerTop: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    zIndex: 100
  },


});


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    navigationState: state.navigationState,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
