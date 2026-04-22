import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Unsubscribe</title>
<style>body{font-family:Arial,sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#333}</style>
</head>
<body>
<h2>Invalid Link</h2>
<p>This unsubscribe link is missing a token. Please use the link from your email.</p>
</body></html>`,
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: subscriber, error: lookupError } = await supabase
    .from("newsletter_subscribers")
    .select("id, email")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (lookupError || !subscriber) {
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Unsubscribe</title>
<style>body{font-family:Arial,sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#333}</style>
</head>
<body>
<h2>Already Unsubscribed</h2>
<p>This link has already been used or is no longer valid.</p>
<p>If you're still receiving emails, contact us at <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a>.</p>
</body></html>`,
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const { error: deleteError } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("id", subscriber.id);

  if (deleteError) {
    console.error("Failed to unsubscribe:", deleteError);
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Unsubscribe Failed</title>
<style>body{font-family:Arial,sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#333}</style>
</head>
<body>
<h2>Something Went Wrong</h2>
<p>We couldn't process your unsubscribe request. Please try again or contact <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a>.</p>
</body></html>`,
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Unsubscribed</title>
<style>
  body{font-family:Arial,sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#333}
  .check{font-size:48px;margin-bottom:16px}
  h2{color:#6D28D9}
  a{color:#6D28D9}
</style>
</head>
<body>
<div class="check">✓</div>
<h2>You've been unsubscribed</h2>
<p>${subscriber.email} has been removed from our newsletter list.</p>
<p>We're sorry to see you go! If you change your mind, you can always <a href="https://www.invisionnetwork.org">re-subscribe on our website</a>.</p>
</body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
};

serve(handler);
