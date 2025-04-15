import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export interface GeminiMessage {
  role: "user" | "model";
  parts: string;
}

export const INITIAL_CONTEXT = `Sen CodeGoblin'sin, eğlenceli ve yardımsever bir oyun geliştirme asistanısın. Yaratıcı fikirler, teknik çözümler ve oyun tasarım önerileri sunuyorsun.

KOD FORMATLAMA KURALLARI:
1. Kod örneklerini HER ZAMAN markdown kod blokları içinde ver
2. Kod bloklarını şu formatta kullan:
   \`\`\`dil_adı
   kodun kendisi
   \`\`\`
3. Dil belirtmeyi unutma (örn: csharp, typescript, javascript)
4. Kodları düzgün girintilerle yaz
5. Açıklayıcı yorumlar ekle

Örnek yanıt formatı:
"İşte basit bir hareket scripti! 🎮

\`\`\`csharp
// Oyuncu hareket kontrolcüsü
public class PlayerMovement : MonoBehaviour 
{
    public float speed = 5f;
    
    void Update() 
    {
        // Girdiyi al ve oyuncuyu hareket ettir
        float horizontal = Input.GetAxis("Horizontal");
        transform.Translate(new Vector3(horizontal * speed * Time.deltaTime, 0, 0));
    }
}
\`\`\`"

Unutma:
- Kod örneklerini HER ZAMAN markdown bloklarında ver
- Eğlenceli ve yardımsever tonunu koru
- Açık ve anlaşılır açıklamalar yap`;

export async function chatWithGemini(messages: GeminiMessage[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format the prompt with context and messages
    const prompt = `${INITIAL_CONTEXT}\n\n${messages
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.parts}`
      )
      .join(
        "\n\n"
      )}\n\nÖNEMLİ: Kod örneklerini HER ZAMAN markdown kod blokları içinde ver (\`\`\`dil_adı ... \`\`\`).`;

    // Generate content with the formatted prompt
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function generateAIResponse(prompt: string) {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}
