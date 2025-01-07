import { instance } from "../axios/index";

// Function for test-session user endpoint
async function testSession() {
  try {
    const response = await instance.get('/test-session');
    return response.data
  } catch (error) {
    const cekSesi = JSON.parse(error.request.response)
    throw new Error(cekSesi?.message || error?.message || 'Something went wrong');
  }
}

// Function for register user endpoint
async function register(name, username, email, password) {
  try {
    const response = await instance.post("/register", { name, username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for verified user email endpoint
async function verifyUserEmail(emailToken) {
  try {
    const response = await instance.post("/verify-email", {emailToken});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function resendVerifyUserEmail(email) {
  try {
    const response = await instance.post("/verify-email/resend", {email});
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
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// function get semua postingan
async function getAllPostingan() {
  try {
    const response = await instance.get("/post"); // Adjust the endpoint accordingly
    return response.data; // Assuming response.data contains the necessary data
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// get all your postingan
async function getYourPostingan() {
  try {
    const response = await instance.get("/post/mine");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostTerbaru() {
  try {
    const response = await instance.get("/post/terbaru"); // Adjust the endpoint accordingly
    return response.data; // Assuming response.data contains the necessary data
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getPostTerlama() {
  try {
    const response = await instance.get("/post/terlama"); // Adjust the endpoint accordingly
    return response.data; // Assuming response.data contains the necessary data
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// get all your postingan
async function delYourPostinganById(id) {
  try {
    const response = await instance.delete(`/post/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

//Function get all user (not admin)
async function getAllUser() {
  try {
    const response = await instance.get(`/user/all`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

//Function profile
async function userProfile() {
  try {
    const response = await instance.get(`/profile`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


//Update Profile
async function updateProfile(formData) {
  const formDataObject = Object.fromEntries(formData.entries());
  try {
    const response = await instance.put('/profile/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } 
  catch (error) {
    if (formDataObject.file?.size > 2000000) { // cek jika yg diterima di formData sebelum dikirim ke axios lebih dari 2MB
      throw new Error('File Tidak Boleh Lebih Dari 2MB')
    }
    const cekSesi = JSON.parse(error.request.response) // cek jika sesi login berakhir
    throw new Error(cekSesi?.message || error?.message || 'Something went wrong');
  }
}

// get user by id
async function getUserbyId(id) {
  try {
    const response = await instance.get(`/profile/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// get user by unique_id 
async function getPostByUniqueId(unique_id) {
  try {
    const response = await instance.get(`/post/all/${unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// get user by slug | slug otomatis dari title
async function getPostDetailBySlug(slug) {
  try {
    const response = await instance.get(`/post/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function for create post endpoint
async function createPost(formData) {
  const formDataObject = Object.fromEntries(formData.entries());
  try {
    const response = await instance.post('/post/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
  catch (error) {
    if (formDataObject.file.size > 2000000) { // cek jika yg diterima di formData sebelum dikirim ke axios lebih dari 2MB
      throw new Error('File Tidak Boleh Lebih Dari 2MB')
    }
    // console.error(error) // code dibawah didapat dari error Axios dari sini
    const cekSesi = JSON.parse(error.request.response) // cek jika sesi login berakhir
    throw new Error(cekSesi?.message || error?.message || 'Something went wrong');
  }
}

// Function for create post endpoint
async function updatePostBySlug(formData, slug) {
  const formDataObject = Object.fromEntries(formData.entries());
  try {
    const response = await instance.put(`/post/update/${slug}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
  catch (error) {
    if (formDataObject.file.size > 2000000) { // cek jika yg diterima di formData sebelum dikirim ke axios lebih dari 2MB
      throw new Error('File Tidak Boleh Lebih Dari 2MB')
    }
    // console.error(error) // code dibawah didapat dari error Axios dari sini
    const cekSesi = JSON.parse(error.request.response) // cek jika sesi login berakhir
    throw new Error(cekSesi?.message || error?.message || 'Something went wrong');
  }
}

// Function Administrator Get All Data User
async function getAllDataUserAdmin(user_role_id) {
  try {
    const response = await instance.get(`/administrator/${user_role_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function Administrator Get Data User by unique_id
async function getUserByUniqueId(unique_id) {
  try {
    const response = await instance.get(`/administrator/get/${unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function Administrator Get All Data User
async function getUserRoleAdmin() {
  try {
    const response = await instance.get(`/administrator/get/role`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function deleteUserByUniqueIdAdmin(unique_id) {
  console.log(unique_id)
  try {
    const response = await instance.delete(`/administrator/${unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function get semua chat obrolan
async function findAllUserChats() {
  try {
    const response = await instance.get(`/chats/find-all`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function Get Data User by unique_id (none admin for chat)
async function getUserByUniqueIdChat(unique_id) {
  try {
    const response = await instance.get(`/user/all/${unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function find atau buat Chat / userone_unique_id, usertwo_unique_id
async function createUserChat( userone_unique_id, usertwo_unique_id, friend, friend_req ) {
  try {
    const response = await instance.post('/chats/find-or-create', { userone_unique_id, usertwo_unique_id, friend, friend_req })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// Function send messsage, 
async function createUserMessage( text, chat_unique_id, setTextMessage ) {
  try {
    const response = await instance.post('/messages', { text, chat_unique_id, setTextMessage })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteAllMessageByUniqueId(chat_unique_id) {
  try {
    const response = await instance.delete(`/messages/delete/${chat_unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function get semua Messages, berdasarkan chat_unique_id di obrolan
async function findAllUserChatsByChatUniqueId(chat_unique_id) {
  try {
    const response = await instance.get(`/messages/find-all/${chat_unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

// Function update data user (friend & last_messge(not necessary))
async function updateUserByChatUniqueIdChat(friend, friend_req, chat_unique_id) {
  try {
    const response = await instance.put(`/chats/update/${chat_unique_id}`, {friend, friend_req}); // tambahkan last_message jika diperlukan
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function deleteUserChatByUniqueId(chat_unique_id) {
  console.log("asdasdasdas" , chat_unique_id)
  try {
    const response = await instance.delete(`/chat/delete/${chat_unique_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function logout() {
  try {
    const response = await instance.post('/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


export { 
  register, verifyUserEmail, resendVerifyUserEmail, login, 
  getUserbyId, userProfile, getUserByUniqueId, updateProfile, getAllUser,
  getYourPostingan, getAllPostingan, getPostByUniqueId, getPostDetailBySlug, getPostTerbaru, getPostTerlama, createPost, updatePostBySlug, delYourPostinganById,
  getAllDataUserAdmin, getUserRoleAdmin, deleteUserByUniqueIdAdmin, 
  findAllUserChats, getUserByUniqueIdChat, createUserChat, 
  createUserMessage, deleteAllMessageByUniqueId,
  findAllUserChatsByChatUniqueId, updateUserByChatUniqueIdChat, deleteUserChatByUniqueId,
  testSession, logout 
};

