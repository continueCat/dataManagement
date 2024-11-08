function setUserInfo(userInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}

function removeUserInfo() {
  localStorage.removeItem("userInfo");
}

export { setUserInfo, getUserInfo, removeUserInfo };
