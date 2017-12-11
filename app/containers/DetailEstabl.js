import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { appStyle } from '../styles';
import Tabs from './Tabs';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import getDirections from 'react-native-google-maps-directions'

import {
  View,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking
} from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Detail extends Component {

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });

    this.props.addRating(this.props.navigationParams.id, rating);
  }

  state = {
    starCount: 0,
    lastPosition: 'unknown',
  }
  componentWillReceiveProps() {
    if(this.props.searchedEstablishments[this.props.navigationParams.id] !== undefined)
      this.setState({starCount: this.props.searchedEstablishments[this.props.navigationParams.id].rating*1})
  }
  componentWillUnmount(){
      this.setState({starCount: 0})
  }

  establ() {
    const tmp = this.props.searchedEstablishments[this.props.navigationParams.id];
  //  console.log(tmp);
  //if(tmp !== undefined)
  //  this.setState({starCount: tmp.rating});
    return tmp || null;
  }
  callPhone(phone)
  {
    Linking.openURL('tel:'+phone).catch(err => console.log('An error occurred', err));
  }
  openGeo(lat, lng)
  {

    if(Object.keys(this.props.locationNow).length > 0)
    {
      const data = {
       source: {
        latitude: this.props.locationNow.latitude,
        longitude: this.props.locationNow.longitude
      },
      destination: {
        latitude: lat*1,
        longitude: lng*1
      }
    }

    getDirections(data);
    }

  //  Linking.openURL('geo:'+lng+','+lat).catch(err => console.log('An error occurred', err));
  }
  openWeb(web)
  {
    Linking.openURL('http://'+web).catch(err => console.log('An error occurred', err));
  }
  constructor(props)
  {
    super(props)
    //this.setState({starCount: estab.rating})

  }

  render() {
    const establishment = this.establ();
    if (!establishment) { return null }

    return <View style={styles.scene}>
        <View style={styles.searchSection}>
          <TouchableHighlight onPress={ () => { this.props.navigateBack() } }>
            <Text style={{ color: '#FFF' } }>Go Back</Text>
          </TouchableHighlight>
        </View>
      <View>
        <Image source={ {uri: 'http://localhost/spweb/uploads/'+establishment.image} } style={styles.resImage} />
        <View style={styles.logo}>
            <Image source={ {uri: 'http://localhost/spweb/uploads/'+establishment.logo}} style={styles.logoImage} />
          </View>

          <View style={styles.fullWidthButton}>
                 <Text style={styles.categorySlogan}>{establishment.name} -{establishment.sales_percent}%</Text>
          </View>
        <View style={ styles.ratingV }><StarRating
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={this.state.starCount}
        starColor={'red'}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      /></View>

        <View style={styles.container}>
        <Tabs>
          {/* First tab */}
          <View title="DESCRIPTION" style={styles.content}>
            <ScrollView>
            <Text style={styles.text}>
              {establishment.description}
            </Text>
            </ScrollView>
          </View>
          {/* Second tab */}
          <View title="RULES" style={styles.content}>
            <Text style={styles.header}>
              {establishment.rules}
            </Text>
          </View>
          {/* Third tab onPress={ () => this.props.navigate({ key: 'DetailEstabl', id: category.id}) }  */}
          <View title="ADDRESSES" style={styles.content}>
            <ScrollView >
                {establishment.addresses.map((address) => {
                  return <View key={address.id}  style={styles.contactCard} >
                    <Text style={styles.contactAddress}>{address.city}, {address.street} {address.street_no}, {address.zip}</Text>
                    <View style={styles.contactWrapper}>
                      <TouchableHighlight style={styles.contactButtom} onPress={() => this.callPhone(address.phone)}>
                        <View><Icon name="phone" size={40} color="#900" style={{textAlign: 'center'}} />
                        <Text>Call</Text></View>
                      </TouchableHighlight>

                      <TouchableHighlight style={styles.contactButtom} onPress={() => this.openWeb(address.web)}>
                        <View>
                          <Icon name="id-card-o" size={40} color="#900" style={{textAlign: 'center'}} />
                          <Text>Web Site</Text></View>
                      </TouchableHighlight>

                      <TouchableHighlight style={styles.contactButtom} onPress={() => this.openGeo(address.lat, address.lng)}>
                        <View>
                          <Icon name="map-signs" size={40} color="#900" style={{textAlign: 'center'}} />
                          <Text>Get Direction</Text></View>
                      </TouchableHighlight>


                    </View>

                </View>
                })}

            </ScrollView>
          </View>

        </Tabs>
      </View>
      </View>

    </View>
  }
}


function mapStateToProps(state) {
  return {
    searchedEstablishments: state.searchedEstablishments,
    navigationParams: state.navigationParams,
    locationNow: state.locationNow,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
const styles = StyleSheet.create({
	scene: {
		flex: 1,
		marginTop: 20,
    backgroundColor: '#4687c1',
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
		position: 'absolute',
		color: '#fff',
		fontSize: 30,
		padding: 5,
    zIndex: 10,
	},
	resImage: {
		height: 190,
		position: 'relative',
	},
  logoImage: {
		height: 65,
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
  logo:{
    height: 70,
    width: 90,
    borderWidth: 5,
    position: 'absolute',
    right:     5,
    top:      5,
    borderColor: '#999',
    overflow: 'hidden',

  },
  ratingV:{
    height: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    left:     5,
    top:      5,
  },
	categorySlogan: {
		color: '#000',
    textAlign: 'left',
    fontSize: 25,
	},
  container: {
    flex: 1,                            // Take up all screen
    backgroundColor: '#5aaef9',         // Background color
  },
  // Tab content container
  content: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
    backgroundColor: '#4687c1',         // Darker background for content area
    paddingTop: 20,
  },
  // Content header
  header: {
    margin: 10,                         // Add margin
    color: '#FFFFFF',                   // White color
    fontFamily: 'Avenir',               // Change font family
    fontSize: 26,
    textAlign: 'left',                 // Bigger font size
  },
  contactCard:{
    height: 150,
    width: (width-60),
    padding: 10,
    backgroundColor: '#EDEBE3',
    marginBottom: 20,
  },
  contactAddress:{
    fontSize: 20,
  },
  contactWrapper:{
    flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        flex: 0.8,
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
  },
  contactButtom:{
    flexDirection:'column',
  },
  // Content text
  text: {
    marginHorizontal: 20,               // Add horizontal margin
    color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
    textAlign: 'left',                // Center
    fontFamily: 'Avenir',
    fontSize: 18,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
