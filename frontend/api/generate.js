// Import library yang dibutuhkan
import { GoogleGenAI } from '@google/generative-ai';
import { GoogleAuth } from 'google-auth-library'; // Tambahkan ini untuk Service Account

export default async function handler(request, response) {
  // Pastikan ini adalah metode POST (atau sesuaikan dengan kebutuhan Anda)
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Ambil isi kunci Service Account dari Environment Variable
    // Penting: Di Vercel, variabel lingkungan diakses melalui process.env
    // const serviceAccountKey = process.env.GCP_SERVICE_ACCOUNT_KEY;
    const serviceAccountKey = import.meta.env.VITE_GCP_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error('GCP_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    // Parsing JSON string menjadi objek JavaScript
    const credentials = JSON.parse(serviceAccountKey);

    // Inisialisasi GoogleAuth dengan kredensial Service Account
    const auth = new GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Scope untuk Vertex AI
    });

    // Ambil client yang sudah terautentikasi
    const authClient = await auth.getClient();

    // Inisialisasi GoogleGenAI dengan client yang sudah terautentikasi
    const ai = new GoogleGenAI({
      vertexai: {
        project: 'trim-heaven-464108-h6', // Pastikan ini project ID Anda
        location: 'global', // Atau lokasi Vertex AI Anda (e.g., 'us-central1')
      },
      auth: authClient, // Gunakan objek authClient yang sudah diinisialisasi
    });

    // Ambil prompt dari body request frontend
    const { prompt } = request.body;
    if (!prompt) {
      return response.status(400).json({ message: 'Prompt is required' });
    }

    // Panggil model Gemini
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    response.status(200).json({ generatedText: textResponse });

  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    response.status(500).json({ message: 'Failed to generate content', error: error.message });
  }
}