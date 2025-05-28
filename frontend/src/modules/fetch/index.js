import { instance } from "../axios/index";

// Function for register user endpoint
async function register(name, username, email, password) {
  try {
    const response = await instance.post("/register", { name, username, email, password });
    return response.data;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// Function for login user endpoint
async function login(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

//Function My Profile
async function getMe() {
  try {
    const response = await instance.get(`/me`);
    return response.data;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

//Update Profile
async function updateProfile(data) {
  console.log(data);
  try {
    const response = await instance.put('/user', data);
    return response.data;
  }
  catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

//Update Profile
async function updateProfileAvatar(formData) {
  try {
    const response = await instance.put('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } 
  catch (error) {
    const file = formData.get('file');
    if (file && file.size > 2000000) {
      throw new Error('File size should not exceed 2MB');
    }
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// Function for get all data products
async function getAllProducts() {
  try {
    const response = await instance.get("/products");
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// Function for get data product by ID
async function getProductByID(id) {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// ADMIN : Function for get all user
async function getAllUsers(params = {}) {
  try {
    const response = await instance.get(`/user`, {
      params: params
    });
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// ADMIN : Function for delete user by ID
async function deleteUserByID(id) {
  try {
    const response = await instance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// ADMIN : Function for get all transaction
async function getAllTrasaction(params = {}) {
  try {
    const response = await instance.get(`/order`, {
      params: params
    });
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

export {
  register, login,
  getAllProducts, getProductByID,
  getMe, updateProfile, updateProfileAvatar,
  getAllUsers, deleteUserByID,
  getAllTrasaction,
};

