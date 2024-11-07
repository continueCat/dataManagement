function setToken(token) {
  localStorage.setItem("authorization", token);
}

function getToken() {
  return localStorage.getItem("authorization");
}

function removeToken() {
  localStorage.removeItem("authorization");
}

export { setToken, getToken, removeToken };
