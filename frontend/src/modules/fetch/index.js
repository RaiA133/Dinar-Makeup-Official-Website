import { instance } from "../axios/index";

// Function for register user endpoint
async function register(name, username, email, password) {
  try {
    const response = await instance.post("/register", { name, username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for login user endpoint
async function login(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

// Function for get all data products
async function getAllProducts() {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

// Function for get data product by ID
async function getProductByID(id) {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export { 
  register, login, 
  getAllProducts, getProductByID
};

