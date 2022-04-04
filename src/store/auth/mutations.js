import JWT from 'jwt-client'
export function setLoginApiStatus(state, data) {
    state.loginApiStatus = data;
  }

export function  setUserProfile(state, data){
    const userProfile = {
      id:data.id,
      displayName: data.displayName,
      username: data.username,
      role: data.role,
      email: data.email,
      blocked: data.blocked,
      confirmed: data.confirmed
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


