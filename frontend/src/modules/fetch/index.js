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
    throw (error|| "Something went wrong");
  }
}

//Function My Profile
async function getMe() {
  try {
    const response = await instance.get(`/me`);
    return response.data;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error|| "Something went wrong");
  }
}

//Update Profile
async function updateProfile(formData) {
  const formDataObject = Object.fromEntries(formData.entries());
  console.log('formDataObject', formDataObject);
  
  try {
    const response = await instance.put('/user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } 
  catch (error) {
    // if (formDataObject.file?.size > 2000000) { // cek jika yg diterima di formData sebelum dikirim ke axios lebih dari 2MB
      // throw new Error('File Tidak Boleh Lebih Dari 2MB')
    // }
    // const cekSesi = JSON.parse(error.request.response) // cek jika sesi login berakhir
    // throw new Error(cekSesi?.message || error?.message || 'Something went wrong');
    throw (error|| "Something went wrong");
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

