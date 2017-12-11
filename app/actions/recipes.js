import * as types from './types'
import Api from '../lib/api'
import DeviceInfo from 'react-native-device-info';
//import { NetworkInfo } from 'react-native-network-info';


export function setSearchedRecipes({ recipes }) {
  return {
    type: types.SET_SEARCHED_RECIPES,
    recipes,
  }
}

export function addRating(_id, _value) {
  console.log(Api.get('/ratingAdd?id='+_id+'&value='+_value+'&ip='+DeviceInfo.getUniqueID() ))
  return {type: types.SET_RATING};
}

export function setCoords(coord) {
  return {
    type: types.SET_COORDS,
    coord
  }
}

export function setSearchedEstablishment({ recipes }) {
  return {
    type: types.SET_SEARCHED_ESTABLISHMENTS,
    recipes,
  }
}

  export function fetchRecipes(params)
  {
    return(dispatch, getState) => {
      return Api.get('/categories').then(resp => {
        dispatch(setSearchedRecipes({recipes: resp}));
      }).catch((ex) => {console.log(ex);
      })
    }
  }


  export function fetchEstblishments(cat_id = null, id = null)
  {
    if(cat_id != null)
    {
      return(dispatch, getState) => {
        return Api.get('/establishments?cat_id='+cat_id).then(resp => {
          dispatch(setSearchedEstablishment({recipes: resp}));
        }).catch((ex) => {console.log(ex);
        })
      }
    }else if(id != null){
      return(dispatch, getState) => {
        return Api.get('/establishments?id='+id).then(resp => {
          dispatch(setSearchedEstablishment({recipes: resp}));
        }).catch((ex) => {console.log(ex);
        })
      }
    }
  }
