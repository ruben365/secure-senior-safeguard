import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ArticleNewsletterRequest {
  articleId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!resendApiKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { articleId }: ArticleNewsletterRequest = await req.json();

    if (!articleId) {
      return new Response(
        JSON.stringify({ error: "articleId is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch article
    const { data: article, error: articleError } = await supabase
      .from("articles")
      .select("title, excerpt, slug, content, featured_image_url")
      .eq("id", articleId)
      .single();

    if (articleError || !article) {
      return new Response(
        JSON.stringify({ error: "Article not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch newsletter subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("is_subscribed", true);

    if (subscribersError) {
      throw new Error(`Failed to fetch subscribers: ${subscribersError.message}`);
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No subscribers to send to", sent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const articleUrl = `https://invisionnetwork.org/articles/${article.slug}`;
    const excerpt = article.excerpt || article.content?.substring(0, 200).replace(/<[^>]*>/g, '') + "...";

    // Send emails in batches
    let sent = 0;
    let failed = 0;
    const batchSize = 50;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (subscriber) => {
        try {
          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Invision Network <onboarding@resend.dev>",
              to: [subscriber.email],
              subject: `New Article: ${article.title}`,
              html: `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #6B46C1; margin: 0;">Invision Network</h1>
                  </div>
                  
                  ${article.featured_image_url ? `
                    <img src="${article.featured_image_url}" alt="${article.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                  ` : ''}
                  
                  <h2 style="color: #1a1a1a; margin-bottom: 15px;">${article.title}</h2>
                  
                  <p style="color: #666; margin-bottom: 25px;">${excerpt}</p>
                  
                  <a href="${articleUrl}" style="display: inline-block; background-color: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Read Full Article
                  </a>
                  
                  <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">
                  
                  <p style="font-size: 12px; color: #999; text-align: center;">
                    You're receiving this because you subscribed to our newsletter.<br>
                    <a href="${articleUrl}/unsubscribe" style="color: #6B46C1;">Unsubscribe</a>
                  </p>
                </body>
                </html>
              `,
            }),
          });

          if (emailResponse.ok) {
            sent++;
          } else {
            failed++;
            console.error(`Failed to send to ${subscriber.email}:`, await emailResponse.text());
          }
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          failed++;
        }
      });

      await Promise.all(emailPromises);
    }

    console.log(`Newsletter sent: ${sent} successful, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent, 
        failed,
        total: subscribers.length 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Newsletter send error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
