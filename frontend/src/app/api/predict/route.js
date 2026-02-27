import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PLANT_CLASSES, EXPLANATIONS } from '../../utils/explanations';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString('base64');

        const prompt = `
        You are a senior Plant Health Expert from Bhavan's Vivekananda College. 
        Analyze this plant leaf image for diseases or nutrient deficiencies.
        
        Strict Rules:
        1. Select the most likely category from this list: ${PLANT_CLASSES.join(', ')}.
        2. DO NOT mention you are an AI, a machine learning model, or OpenAI.
        3. Speak with authority and professional expertise.
        4. Focus on scientific biological observations.
        
        Provide the output in JSON format:
        {
          "predicted_class": "Exact string from the categorical list",
          "confidence": 0.0 to 1.0,
          "analysis": "Professional scientific reasoning (describe visible biological symptoms)",
          "recommendation": "Expert management strategy and next steps"
        }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
        });

        const aiData = JSON.parse(response.choices[0].message.content);
        const prediction = aiData.predicted_class || PLANT_CLASSES[3]; // Default to healthy apple if fails
        const explanation = EXPLANATIONS[prediction] || EXPLANATIONS[PLANT_CLASSES[3]];

        return NextResponse.json({
            plant_name: prediction.split('___')[0].replace(/_/g, ' '),
            predicted_disease: prediction.split('___')[1].replace(/_/g, ' '),
            confidence_score: `${(aiData.confidence * 100 || 95).toFixed(2)}%`,
            category: explanation.category,
            biological_explanation: aiData.analysis || explanation.scientific_reason,
            recommended_action: aiData.recommendation || explanation.recommended_action
        });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: "Diagnostic system failure" }, { status: 500 });
    }
}
