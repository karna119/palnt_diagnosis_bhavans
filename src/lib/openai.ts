import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const isConfigured = apiKey && apiKey !== 'YOUR_OPENAI_API_KEY';

export const openai = isConfigured
  ? new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  })
  : (null as any);

export const DIAGNOSIS_PROMPT = `
You are a professional botanical health and disease analysis expert.
Given an image of a plant leaf, analyze it for signs of diseases, nutrient deficiencies, or pest infestations.
Return a JSON object with the following structure:
{
  "plant_name": "Name of the plant",
  "predicted_disease": "Name of the detected disease",
  "category": "e.g., Fungal, Bacterial, Viral, Pest, Healthy",
  "confidence_score": "e.g., 95%",
  "biological_explanation": "A professional explanation of the condition",
  "recommended_action": "Detailed steps to take"
}
`;

if (!isConfigured) {
  console.warn('OpenAI is not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
}
