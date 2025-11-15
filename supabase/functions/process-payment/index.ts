import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const { paymentMethodId, amount, currency, customerInfo, items } = await req.json();

    console.log('Processing payment:', { amount, currency, items: items.length });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      receipt_email: customerInfo.email,
      metadata: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    // Send receipt email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const itemsList = items.map((item: any) => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const emailBody = `
Thank you for your purchase from InVision Network!

Order Details:
${itemsList}

Shipping Address:
${customerInfo.name}
${customerInfo.address}
${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}

Payment Information:
Amount: $${(amount / 100).toFixed(2)}
Transaction ID: ${paymentIntent.id}
Date: ${new Date().toLocaleDateString()}

Your order will be processed and shipped within 2-3 business days.

Questions? Contact us at hello@invisionnetwork.org

Best regards,
InVision Network Team
      `.trim();

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'InVision Network <noreply@invisionnetwork.org>',
          to: [customerInfo.email],
          subject: 'Order Confirmation - InVision Network',
          text: emailBody,
        }),
      });

      console.log('Receipt email sent to:', customerInfo.email);
    }

    return new Response(
      JSON.stringify({ success: true, paymentIntentId: paymentIntent.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Payment error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
