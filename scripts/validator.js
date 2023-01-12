import { getUser } from "./user.js"

function userLogged() {
  const user = getUser();
  if (user === null) {
    window.location.replace('/pages/login.html')
  }
}
userLogged()
