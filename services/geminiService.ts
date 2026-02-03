
import { GoogleGenAI } from "@google/genai";

export const getAIExplanation = async (
  calculatorName: string,
  inputs: Record<string, any>,
  outputs: Record<string, any>
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI insights are unavailable. API Key is missing from the environment.";
  }

  // Use a named parameter for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Context: A professional user is using the "${calculatorName}" toolkit.
    Inputs: ${JSON.stringify(inputs, null, 2)}
    Calculated Results: ${JSON.stringify(outputs, null, 2)}

    Goal: Provide a high-level, strategic interpretation of these findings.
    - Explain the "Why" behind the "What".
    - If financial, discuss risks/opportunities. 
    - If health, discuss wellness implications.
    - If math/engineering, explain the physical/theoretical significance.
    - Formatting: Maximum 120 words. Use clear paragraphs. No markdown headers.
    - Tone: Sophisticated, architectural, precise.
  `;

  try {
    // Generate content using the recommended model and passing configuration directly
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
        // Fix: Removed maxOutputTokens to follow SDK best practices and avoid potential response truncation
      }
    });

    // Access the .text property directly
    const text = response.text;
    return text || "Computation successful, but AI interpretation failed to converge. Please verify inputs.";
  } catch (error: any) {
    console.error("Gemini Critical Failure:", error);
    
    // Friendly error categorization
    if (error?.message?.includes('429')) return "High traffic. AI insights are currently throttled.";
    if (error?.message?.includes('400')) return "Input parameters are outside AI processing bounds.";
    
    return "The AI engine encountered a synchronization issue. Local math remains accurate.";
  }
};