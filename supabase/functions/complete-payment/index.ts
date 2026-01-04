import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[COMPLETE-PAYMENT] ${step}${detailsStr}`);
};

interface CompletePaymentRequest {
  paymentType: 'donation' | 'subscription' | 'product' | 'service';
  paymentIntentId?: string;
  sessionId?: string;
  recordId?: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  productName?: string;
  metadata?: Record<string, any>;
}

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "InVision Network <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }
  
  return response.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    const {
      paymentType,
      paymentIntentId,
      sessionId,
      recordId,
      customerEmail,
      customerName,
      amount,
      productName,
      metadata
    }: CompletePaymentRequest = await req.json();

    logStep("Request data", { paymentType, paymentIntentId, sessionId, recordId, customerEmail });

    const formattedAmount = `$${(amount / 100).toFixed(2)}`;

    switch (paymentType) {
      case 'donation': {
        // Update donation status
        if (recordId) {
          await supabaseClient
            .from('donations')
            .update({ 
              payment_status: 'completed',
              stripe_payment_id: paymentIntentId || sessionId,
              updated_at: new Date().toISOString()
            })
            .eq('id', recordId);
          logStep("Updated donation record", { recordId });
        }

        // Send thank-you email
        await sendEmail(
          customerEmail,
          "Thank You for Your Donation! 💖 - InVision Network",
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #6D28D9;">Thank You, ${customerName}! 💖</h1>
              
              <p>Your generous donation of <strong>${formattedAmount}</strong> has been received and is making a real difference.</p>
              
              <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h2 style="color: #16a34a; margin-top: 0;">Your Impact</h2>
                <p>Your contribution helps us:</p>
                <ul>
                  <li>Protect seniors from online scams</li>
                  <li>Provide free security training</li>
                  <li>Support families in need</li>
                </ul>
              </div>
              
              <p>A tax receipt will be sent separately for your records.</p>
              
              <p style="margin-top: 30px;">With gratitude,<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent donation thank-you email");
        break;
      }

      case 'subscription': {
        // Send welcome email for subscription
        await sendEmail(
          customerEmail,
          `Welcome to ${productName || 'Your Subscription'}! - InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #6D28D9;">Welcome, ${customerName}! 🎉</h1>
              
              <p>Thank you for subscribing to <strong>${productName || 'our service'}</strong>.</p>
              
              <div style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h2 style="color: #6D28D9; margin-top: 0;">Subscription Details</h2>
                <p><strong>Plan:</strong> ${productName}</p>
                <p><strong>Amount:</strong> ${formattedAmount}/month</p>
                <p><strong>Status:</strong> Active ✓</p>
              </div>
              
              <h3>What's Next?</h3>
              <ul>
                <li>Access your dashboard to manage your subscription</li>
                <li>Set up your profile and preferences</li>
                <li>Explore all features included in your plan</li>
              </ul>
              
              <p style="margin-top: 30px;">Welcome aboard!<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent subscription welcome email");
        break;
      }

      case 'product': {
        // Product payments are handled by process-payment edge function
        logStep("Product payment - handled separately");
        break;
      }

      case 'service': {
        // Update service booking/inquiry status if applicable
        if (recordId) {
          await supabaseClient
            .from('booking_requests')
            .update({ 
              status: 'paid',
              updated_at: new Date().toISOString()
            })
            .eq('id', recordId);
        }

        await sendEmail(
          customerEmail,
          `Payment Confirmed - ${productName || 'Service'} - InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #6D28D9;">Payment Confirmed! ✓</h1>
              
              <p>Thank you, ${customerName}! Your payment of <strong>${formattedAmount}</strong> for <strong>${productName || 'your service'}</strong> has been received.</p>
              
              <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">✓ Payment Successful</h2>
                <p>Our team will contact you within 24 hours to schedule your service.</p>
              </div>
              
              <p>Questions? Reply to this email or call us at <a href="tel:9373018749">(937) 301-8749</a>.</p>
              
              <p style="margin-top: 30px;">Thank you for choosing InVision Network!<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent service payment confirmation email");
        break;
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Payment completed successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
