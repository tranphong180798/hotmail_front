export const state =()=> ({
  users: [],
  currentUser: {},
  token:'',

})
export const mutations= {
  LOGOUT_USER(state) {
    state.currentUser = {}
    window.localStorage.currentUser = JSON.stringify({});
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
    console.log("GOOD");
    localStorage.currentUser = JSON.stringify(user);
  },
  LOAD_USER(user) {
    state.user = user;
    console.log("LOADING");
  },
  setButton(state,flag) {
    console.log('flag:',flag);
    localStorage.open_button_api = flag;
  },
}


export const actions = {
  logoutUser({commit}) {
    commit('LOGOUT_USER');
  },
  loginUser({commit}, user) {
    console.log("Login success");
    commit('SET_CURRENT_USER', user);
  },
  listUser({commit},user){
    commit('LOAD_USER');
  },
  setButton({commit},{flag}){
    console.log('flag:',flag);
    commit('setButton',flag);
  }
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },


}
// async registerUser({commit}, registrationInfo) {
//   try {
//     let response = await Api().post('/users', registrationInfo);
//     let user = response.data.data.attributes;
//
//     commit('SET_CURRENT_USER', user);
//     return user;
//   } catch {
//     return {error: "There was an error.  Please try again."}
//   }
// }
// }
