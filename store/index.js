export const state = () => ({
    users: [],
    currentUser: {},
    token: null,

})
export const mutations = {
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
    setButton(state, flag) {
        console.log('flag:', flag);
        localStorage.open_button_api = flag;
    },
    setToken(state, token) {
        state.token = token;
        localStorage.setItem("token", token);
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
    listUser({commit}, user) {
        commit('LOAD_USER');
    },
    setButton({commit}, {flag}) {
        commit('setButton', flag);
    },
    setToken({commit}, {token}) {
        commit('setToken', token);
    }
}
export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },

    // getToken(state) {
    //     if(state.token === null) {
    //        return window.localStorage.getItem("token")
    //     }
    //     return state.token;
    // },


}
