// LOCAL STORAGE

export const setAuthUser = (data) => {
  // save object to local storage as text
  localStorage.setItem("user", JSON.stringify(data)); // stringify object from json to text
};

export const getAuthUser = (data) => {
  // get object from local storage as json
  if (localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user")); // parse object from text to json
};

export const removeAuthUser = (data) => {
  // remove object from local storage
  if (localStorage.getItem("user")) return localStorage.removeItem("user");
};
