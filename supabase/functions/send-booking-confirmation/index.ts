import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-BOOKING-CONFIRMATION] ${step}${detailsStr}`);
};

interface BookingConfirmationRequest {
  email: string;
  name: string;
  serviceName: string;
  requestNumber: string;
  preferredDate?: string;
  serviceType?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const {
      email,
      name,
      serviceName,
      requestNumber,
      preferredDate,
      serviceType
    }: BookingConfirmationRequest = await req.json();

    logStep("Request data", { email, name, serviceName, requestNumber });

    // Send confirmation email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: [email],
        subject: `Booking Request Received - ${serviceName} | InVision Network`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Booking Request Received! ✓</h1>
            
            <p>Hi ${name},</p>
            
            <p>Thank you for your booking request. We've received your inquiry and our team will contact you within <strong>24 hours</strong>.</p>
            
            <div style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h2 style="color: #6D28D9; margin-top: 0;">Booking Details</h2>
              <p><strong>Reference Number:</strong> ${requestNumber}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
            </div>
            
            <h3>What Happens Next?</h3>
            <ol>
              <li>Our team reviews your request</li>
              <li>We'll contact you to confirm availability</li>
              <li>Finalize your appointment details</li>
              <li>Receive your calendar invite</li>
            </ol>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
              </p>
            </div>
            
            <p style="margin-top: 30px;">We look forward to serving you!<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const error = await customerEmailResponse.text();
      console.error("Customer email send failed:", error);
      throw new Error("Failed to send customer email");
    }

    logStep("Customer confirmation email sent");

    // Send notification to admin
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Booking Request - ${requestNumber}`,
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Reference:</strong> ${requestNumber}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${serviceName}</p>
          ${serviceType ? `<p><strong>Type:</strong> ${serviceType}</p>` : ''}
          ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
          <hr>
          <p><small>Action required: Review and respond within 24 hours</small></p>
        `,
      }),
    });

    logStep("Admin notification sent");

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation emails sent" }),
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
