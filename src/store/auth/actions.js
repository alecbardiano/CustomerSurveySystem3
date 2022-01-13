
import { api} from 'boot/axios'
import JWT from 'jwt-client'

function setAxiosHeaders (token) {
    // set localstorage
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token
    localStorage.setItem('jwt', token)
}

export async function setUserStore({ commit }, payload){
  
  commit("setUserProfile", payload)
}

export async function setLoggedIn({ commit }, flag){
  
  //logged in true
  if(flag == 1){
    commit("setLoginApiStatus", "success")
  }else{
    commit("setLoginApiStatus", "failed")
  }
}


export async function loginApi ( { commit }, payload) {
    const response = await api.post('/auth/local', 
      payload)
      .catch((err) => {
        console.log(err);
      });
 
    if (response && response.data && response.data.user) {
      if(response.data.user.confirmed && response.data.user.blocked == false){
        commit("setLoginApiStatus", "success");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isLoggedIn", "success");
        commit("setUserProfile", response.data)
        localStorage.setItem("user",JSON.stringify(response.data.user))
        // console.log(response.data, session.claim.auth)
    //    commit('login', { token: response.data.token, refeshToken: response.data.refesh_token, user: response.data.user, authorization: session.claim.auth })
       setAxiosHeaders(response.data.jwt)
      }else{
        commit("setLoginApiStatus", "usernotaccess");
        
      }
      
      // let a = store.getters["auth/getUserProfile"];
      // let a = 
      // save user id to local storage
      // store mag call ng api
      // tawagin si setuserprofile
      // user save then get every refresh
      
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
    localStorage.removeItem("jwt")
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user")
    localStorage.removeItem("userProfile");
    localStorage.removeItem("isLoggedIn")
    api.defaults.headers.common['Authorization'] = ''

}
