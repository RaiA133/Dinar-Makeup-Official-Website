import { instance } from "../axios/chatbot";

//Function My Profile
async function healthCheck() {
  try {
    const response = await instance.get(`/`);
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// Function for login user endpoint
async function chatBot(message, history) {
  try {
    const response = await instance.post("/ai/chat", { message, history });
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

// Function for login user endpoint
async function guideBot(message, history) {
  try {
    const response = await instance.post("/ai/guide", { message, history });
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

async function seo(slug = 'home') {
  try {
    const response = await instance.post(`/ai/seo?slug=${slug}`);
    return response;
  } catch (error) {
    // console.log("Error : ", error);
    throw (error || "Something went wrong");
  }
}

export {
  healthCheck, chatBot, guideBot, seo, 
};

