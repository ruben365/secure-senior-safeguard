import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt based on type
    let systemPrompt = "";
    switch (type) {
      case "sentiment":
        systemPrompt = "You are a sentiment analysis expert. Analyze the emotional tone, sentiment (positive/negative/neutral), and key themes in the text provided. Be concise and clear.";
        break;
      case "summary":
        systemPrompt = "You are a summarization expert. Create clear, concise summaries that capture the main points and key information. Keep summaries brief but comprehensive.";
        break;
      case "translation":
        systemPrompt = "You are a professional translator. Translate text accurately while preserving tone, context, and cultural nuances. Always specify the target language.";
        break;
      case "document_qa":
        systemPrompt = "You are a document analysis expert. Answer questions about documents accurately and cite specific information when possible. If you don't know, say so.";
        break;
      case "image_analysis":
        systemPrompt = "You are an image analysis expert. Describe images in detail, identify objects, text, and context. Be thorough and precise.";
        break;
      default:
        systemPrompt = "You are a helpful AI assistant for InVision Network, specializing in scam protection and business solutions for seniors. Be friendly, clear, and supportive.";
    }

    console.log(`Processing ${type} request with ${messages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    // Stream the response back
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
