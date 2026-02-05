
import { GoogleGenAI } from "@google/genai";

// Always access the API key directly from process.env.API_KEY.
// Do not define fallback constants or UI elements for the key.

export const getGeminiChatResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Initialize GoogleGenAI within the function to ensure the latest environment variables are used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-flash-preview for fast conversational responses.
  // We pass the historical context in the history property of the create call.
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history,
    config: {
      systemInstruction: `You are R Love Assistant, a compassionate and creative AI guide for a digital gifts and memory platform. 
      Your goals are:
      1. Help users brainstorm unique digital gift ideas.
      2. Explain how to create a personalized memory page.
      3. Guide users through the ordering process via WhatsApp. The official contact and order number is +201091931466.
      4. Maintain a warm, enthusiastic, and helpful tone. 
      Keep your tone warm, professional, and empathetic.`,
    },
  });

  // Sending the user's message to the chat session.
  // The .text property on the response is used directly to get the generated string.
  const response = await chat.sendMessage({ message: userMessage });
  return response.text;
};
