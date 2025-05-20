import { instance } from "../axios/index";

// Function for register user endpoint
async function register(name, username, email, password) {
  try {
    const response = await instance.post("/register", { name, username, email, password });
    return response.data;
  } catch (error) {
    console.log("Error : ", error);
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
async function updateProfile(formData) {
  try {
    const response = await instance.put('/user', formData,);
    return response.data;
  }
  catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// Function for get all data products
async function getAllProducts() {
  try {
    const response = await instance.get("/products");
    return response.data;
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

export {
  register, login,
  getAllProducts, getProductByID,
  getMe, updateProfile
};

