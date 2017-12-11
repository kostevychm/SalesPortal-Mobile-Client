import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { appStyle } from '../styles';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Detail extends Component {
  establ() {
      return Object.keys(this.props.searchedEstablishments).map(key => this.props.searchedEstablishments[key])
  }

  render() {
    //this.props.fetchEstblishments(this.props.navigationParams.id, null);
    return <View style={styles.scene}>
        <View style={styles.searchSection}>
          <TouchableHighlight onPress={ () => { this.props.navigateBack() } }>
            <Text style={{ color: '#FFF' } }>Go Back</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.scrollSection} >
          {this.establ().map((category) => {
            return <TouchableHighlight key={category.id}  style={styles.searchButton} onPress={ () => this.props.navigate({ key: 'DetailEstabl', id: category.id}) }>
              <View style={styles.searchSec}>

                <View style={styles.fullWidthButtonTop}>
                       <Text style={styles.categoryTitle}>Sleva ve vyssi: {category.sales_percent}%</Text>
                </View>

    						<Image source={ {uri: 'http://localhost/spweb/uploads/'+category.image}} style={styles.resImage} />

                <View style={styles.logo}>
                    <Image source={ {uri: 'http://localhost/spweb/uploads/'+category.logo}} style={styles.logoImage} />
                  </View>

    							<View style={styles.fullWidthButton}>
    							       <Text style={styles.categorySlogan}>{category.name}</Text>
    							</View>

    					</View>
          </TouchableHighlight>
          })}

        </ScrollView>
    </View>
  }
}


function mapStateToProps(state) {
  return {
    navigationParams: state.navigationParams,
    searchedEstablishments: state.searchedEstablishments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const styles = StyleSheet.create({
	scene: {
		flex: 1,
		marginTop: 20,
	},
	searchSec: {
		marginBottom: 15,
    position: 'relative',
	},
  searchSection: {
    height: 30,
    flexDirection: 'row',
    borderBottomColor: '#4687c1',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#5aaef9',

  },
	scrollSection: {
		flex: 0.8
	},
	searchButton: {paddingTop: 10,},
	categoryTitle: {
		alignItems: 'center',
		justifyContent: 'center',

		color: '#000',
		fontSize: 15,
		backgroundColor: 'transparent',
    zIndex: 8,
	},
	resImage: {
		height: 170,
		position: 'relative',
	},
  logoImage: {
		height: 65,
		position: 'relative',
    zIndex: 15,
	},
	fullWidthButton: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		marginTop: -40,
	},

  fullWidthButtonTop: {
		height: 25,
    width: width,
    padding: 4,
		backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    top:      0,
    left: 0,
    zIndex: 5,

	},

  logo:{
    height: 70,
    width: 90,
    borderWidth: 5,
    position: 'absolute',
    right:     5,
    top:      5,
    borderColor: '#999',
    overflow: 'hidden',
    zIndex: 15,

  },
	categorySlogan: {
		color: '#000',
    textAlign: 'left',
    fontSize: 20,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
