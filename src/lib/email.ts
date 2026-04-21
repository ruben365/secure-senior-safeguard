/**
 * Email utility — thin typed wrappers around InVision Network's Supabase edge functions.
 *
 * ALL Resend API calls happen server-side in the edge functions. The RESEND_API_KEY
 * is a Supabase secret and is never exposed to the browser.
 *
 * Usage:
 *   import { sendBookingConfirmation } from "@/lib/email";
 *   await sendBookingConfirmation({ email, name, serviceName, requestNumber });
 */

import { supabase } from "@/integrations/supabase/client";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

interface EmailResult {
  success: boolean;
  error?: string;
}

async function invokeEmailFunction(
  functionName: string,
  payload: Record<string, unknown>,
): Promise<EmailResult> {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) {
    console.error(`[email] ${functionName} failed:`, error);
    return { success: false, error: error.message };
  }

  if (data && !data.success) {
    return { success: false, error: data.error ?? "Unknown error" };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// A. Booking inquiry confirmation
//    Triggered after a service inquiry or appointment request.
// ---------------------------------------------------------------------------

export interface BookingConfirmationParams {
  email: string;
  name: string;
  serviceName: string;
  requestNumber: string;
  preferredDate?: string;
  serviceType?: string;
  [key: string]: unknown;
}

export async function sendBookingConfirmation(
  params: BookingConfirmationParams,
): Promise<EmailResult> {
  return invokeEmailFunction("send-booking-confirmation", params);
}

// ---------------------------------------------------------------------------
// B. Lead / inquiry follow-up
//    Triggered after a contact form submission.
// ---------------------------------------------------------------------------

export interface InquiryConfirmationParams {
  email: string;
  name: string;
  serviceName: string;
  inquiryNumber: string;
  servicePrice?: number;
  companyName?: string;
  [key: string]: unknown;
}

export async function sendInquiryConfirmation(
  params: InquiryConfirmationParams,
): Promise<EmailResult> {
  return invokeEmailFunction("send-inquiry-confirmation", params);
}

// ---------------------------------------------------------------------------
// C. Customer welcome email
//    Triggered after a new customer purchases a plan.
//    Amanda is introduced as the point of contact.
// ---------------------------------------------------------------------------

export interface CustomerWelcomeParams {
  email: string;
  name: string;
  planName: string;
  planPrice?: number;
  billingCycle?: "monthly" | "annual";
  [key: string]: unknown;
}

export async function sendCustomerWelcome(
  params: CustomerWelcomeParams,
): Promise<EmailResult> {
  return invokeEmailFunction("send-customer-welcome", params);
}

// ---------------------------------------------------------------------------
// D. Workshop registration confirmation
//    Triggered after workshop enrollment / payment.
// ---------------------------------------------------------------------------

export interface WorkshopRegistrationParams {
  email: string;
  name: string;
  workshopName: string;
  workshopDate: string;
  workshopTime: string;
  format: "in-person" | "zoom";
  location?: string;
  zoomLink?: string;
  registrationNumber: string;
  price?: number;
  [key: string]: unknown;
}

export async function sendWorkshopRegistration(
  params: WorkshopRegistrationParams,
): Promise<EmailResult> {
  return invokeEmailFunction("send-workshop-registration", params);
}

// ---------------------------------------------------------------------------
// E. Contact notification (internal — notifies the InVision team of a new contact)
// ---------------------------------------------------------------------------

export interface ContactEmailParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
  serviceType?: string;
  [key: string]: unknown;
}

export async function sendContactEmail(
  params: ContactEmailParams,
): Promise<EmailResult> {
  return invokeEmailFunction("send-contact-email", params);
}
