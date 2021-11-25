import JWT from 'jwt-client'
export function setLoginApiStatus(state, data) {
    state.loginApiStatus = data;
  }

export function  setUserProfile(state, data){
    console.log("data", data)
    const userProfile = {
      id:data.user.id,
      name: data.user.displayName,
      username: data.user.username,
      role: data.user.role.type,
      email: data.user.email
    };
    state.userProfile = userProfile
}

export function logoutUserProfile(state,data){
    const userProfile = {
        id:data.id,
        name: data.displayName,
        username: data.username,
        role: data.type,
        email: data.email
      };
      state.userProfile = userProfile
}




// export const logout = (state) => {
//   // reset saved token
//   state.token = null
//   // remove token from local storage
//   JWT.forget()
// }

// export const setToken = (state, { token, axios }) => {
//   // all is good, validate the token
//   if (JWT.validate(token)) {
//     // keep token in localstorage
//     JWT.keep(token)
//     // update axios
//     axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
//     if (token) {
//       axios.defaults.headers.common['X-Access-Token'] = token
//     }
//     else {
//       axios.defaults.headers.common['X-Access-Token'] = ''
//     }
//     // console.log('token updated')
//   }
//   else {
//     console.error('JWT failed to validate token')
//     token = null
//   }

//   // console.log('old token:', state.token)
//   state.token = token
//   // console.log('new token:', state.token)

//   return state.token
// }
// export function    loginSuccess(state, user) {
//       state.status.loggedIn = true;
//       state.user = user;
// }
// export function     loginFailure(state) {
//     state.status.loggedIn = false;
//     state.user = null;
// }
// export function    logout(state) {
//     state.status.loggedIn = false;
//     state.user = null;
// }
// export function    registerSuccess(state) {
//     state.status.loggedIn = false;
// }
// export function    registerFailure(state) {
//     state.status.loggedIn = false;
// }


