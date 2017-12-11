import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { appStyle } from '../styles';
const {
  ScrollView,
  View,
  TextInput,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
} = ReactNative;
import SplashScreen from 'react-native-splash-screen'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { searching: true}

  }

  watchID: ?number = null;
  componentDidMount() {
      	 // do anything while splash screen keeps, use await to wait for an async task.
         this.props.fetchRecipes();


          this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.props.setCoords({lastPosition});
          });

          SplashScreen.hide();
      }

componentWillUnmount() {
   navigator.geolocation.clearWatch(this.watchID);
 }
  recipes() {
    return Object.keys(this.props.searchedRecipes).map(key => this.props.searchedRecipes[key])
  }
_onPressButton(cat)
{
  this.props.fetchEstblishments(cat);
  this.props.navigate({ key: 'Detail', id: cat});
}
  render() {

    return (
      <View style={styles.scene}>

        <ScrollView style={styles.scrollSection} >
          {this.recipes().map((category) => {
            return <TouchableHighlight key={category.id}  style={styles.searchButton} onPress={() => this._onPressButton(category.id)}>
              <View style={styles.searchSec}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
    						<Image source={ {uri: 'http://localhost/spweb/uploads/'+category.image}} style={styles.resImage} />

    							<View style={styles.fullWidthButton}>
    							       <Text style={styles.categorySlogan}>{category.slogan}</Text>
    							</View>

    					</View>
          </TouchableHighlight>
          })}
          {(Object.keys(this.props.searchedRecipes).length == 0) ? <Text>Searching...</Text> : null }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	scene: {
    marginTop: 15,
	},
	searchSec: {
		marginBottom: 15,
	},
	scrollSection: {
		flex: 0.8
	},
	categoryTitle: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		color: '#fff',
		fontSize: 30,
		backgroundColor: 'transparent',
		padding: 5,
    zIndex: 10,

	},
	resImage: {
		height: 150,
		position: 'relative',
	},
	fullWidthButton: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		marginTop: -40,
	},
	categorySlogan: {
		color: '#000',
	},
});

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes,
    searching: state.searching
  };
}

export default connect(mapStateToProps)(Home);
