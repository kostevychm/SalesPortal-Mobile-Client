import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedRecipes = createReducer({}, {
  [types.SET_SEARCHED_RECIPES](state, action) {
    let newState = {}
    action.recipes.forEach( (recipe) => {
      let id = recipe.id
      newState[id] = Object.assign({}, recipe, { id });
    });
    return newState;
  },


});

export const locationNow = createReducer({}, {
  [types.SET_COORDS](state, action) {
    const res = JSON.parse(action.coord.lastPosition);
    let id = Math.floor(res.timestamp);

    return Object.assign({}, res.coords, {id});
  }
});
/*
export const searchedEstablishments = createReducer({}, {
  [types.SET_SEARCHED_RECIPES](state, action) {
    let newState = {}
    action.recipes.forEach( (recipe) => {
      let id = recipe.id
      newState[id] = Object.assign({}, recipe, { id });
    });
    return newState;
  },


});
*/

export const searchedEstablishments = createReducer({}, {
  [types.SET_SEARCHED_ESTABLISHMENTS](state, action) {
    state = undefined;
    let newState = {}

    if(action.recipes.status != false)
    {
    action.recipes.forEach( (recipe) => {

      let id = recipe.id
      newState[id] = Object.assign({}, recipe, { id });
    });}
    return newState;
  }, });
