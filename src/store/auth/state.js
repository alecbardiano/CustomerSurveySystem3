export default function () {
  return {
    //
    loginApiStatus: localStorage.getItem("isLoggedIn") || "" ,
    userProfile:{
      id: 0,
      name: "",
      username: "",
      role: "",
      email: ""
    },
    
  }
}
