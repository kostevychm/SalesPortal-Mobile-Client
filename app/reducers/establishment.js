/*export const searchedEstablishments = createReducer({}, {
  [types.SET_SEARCHED_ESTABLISHMENTS](state, action) {
    let newState = {}
    action.recipes.forEach( (recipe) => {
      let id = recipe.id
      newState[id] = Object.assign({}, recipe, { id });
    });
    return newState;
  }, });
*/
