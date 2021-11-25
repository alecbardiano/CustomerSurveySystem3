
import { api} from 'boot/axios'
import JWT from 'jwt-client'

function setAxiosHeaders (token) {
    // set localstorage
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token
    localStorage.setItem('jwt', token)
    console.log("api from actions" ,api.defaults.headers.post)
}


export async function loginApi ( { commit }, payload) {
    // return api.post('/auth/local', {
    //     identifier: username.toString(),
    //     password: password.toString()
    //   }).then(function( response ){
    //       // console.log(response.data.results)
    //       setJWT(response.data.jwt)
    //     }
    //   )
    console.log("paylad", payload)
    const response = await api.post('/auth/local', 
      payload)
      .catch((err) => {
        console.log(err);
      });
    console.log("response",response)
 
    if (response && response.data) {
      commit("setLoginApiStatus", "success");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isLoggedIn", "success");
      commit("setUserProfile", response.data)
        // console.log(response.data, session.claim.auth)
    //    commit('login', { token: response.data.token, refeshToken: response.data.refesh_token, user: response.data.user, authorization: session.claim.auth })
       setAxiosHeaders(response.data.jwt)
    } else {
      commit("setLoginApiStatus", "failed");
    }
}
export async function logout ( { commit }) {
    commit("setLoginApiStatus", "failed");
    // reset user
    let data = {
        id: 0,
        name: "",
        username: "",
        role: "",
        email: ""
      }
    commit("logoutUserProfile", data)
}
