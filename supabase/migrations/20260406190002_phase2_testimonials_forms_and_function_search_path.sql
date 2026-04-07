-- =============================================================================
-- Phase 2 - fix RLS policy_always_true warnings and function search_path
-- Tightens permissive testimonials/contact-form policies and pins
-- search_path on SECURITY DEFINER role functions.
-- =============================================================================

-- ----- TESTIMONIALS - replace permissive auth-only policies with role gating -
DROP POLICY IF EXISTS "Staff can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;

CREATE POLICY "Public can view approved testimonials"
  ON public.testimonials FOR SELECT
  USING (
    status = 'approved'
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  );

CREATE POLICY "Anyone can submit testimonials"
  ON public.testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND story IS NOT NULL AND length(story) BETWEEN 5 AND 5000
    AND (rating IS NULL OR rating BETWEEN 1 AND 5)
    AND status = 'pending'
  );

CREATE POLICY "Staff can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  );

CREATE POLICY "Staff can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  );

-- ----- CONTACT_MESSAGES - tighten the open INSERT check ----------------------
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND length(email) BETWEEN 5 AND 320 AND email LIKE '%@%.%'
    AND message IS NOT NULL AND length(message) BETWEEN 5 AND 10000
    AND read = false
  );

-- ----- JOB_APPLICATIONS - tighten the open INSERT check ----------------------
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;

CREATE POLICY "Anyone can submit job applications"
  ON public.job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND length(email) BETWEEN 5 AND 320 AND email LIKE '%@%.%'
    AND phone IS NOT NULL AND length(phone) BETWEEN 5 AND 50
    AND position IS NOT NULL AND length(position) BETWEEN 1 AND 200
    AND cover_letter IS NOT NULL AND length(cover_letter) BETWEEN 10 AND 10000
    AND status = 'pending'
  );

-- ----- NEWSLETTER_SUBSCRIBERS - tighten the open INSERT check ----------------
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(email) BETWEEN 5 AND 320 AND email LIKE '%@%.%'
  );

-- ----- SCAM_SUBMISSIONS - tighten the open INSERT check ----------------------
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.scam_submissions;

CREATE POLICY "Anyone can insert submissions"
  ON public.scam_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    submission_type IS NOT NULL AND length(submission_type) BETWEEN 1 AND 50
    AND scam_content IS NOT NULL AND length(scam_content) BETWEEN 5 AND 50000
    AND (user_id IS NULL OR user_id = auth.uid())
  );

-- ----- WEBSITE_INQUIRIES - tighten the open INSERT check ---------------------
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.website_inquiries;

CREATE POLICY "Anyone can submit inquiries"
  ON public.website_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND length(email) BETWEEN 5 AND 320 AND email LIKE '%@%.%'
    AND inquiry_type IS NOT NULL AND length(inquiry_type) BETWEEN 1 AND 50
    AND (message IS NULL OR length(message) BETWEEN 1 AND 10000)
  );

-- ----- GUEST_SCANS - tighten the open INSERT check ---------------------------
DROP POLICY IF EXISTS "Anyone can create guest scans" ON public.guest_scans;

CREATE POLICY "Anyone can create guest scans"
  ON public.guest_scans FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    session_id IS NOT NULL AND length(session_id) BETWEEN 1 AND 200
    AND scan_type IS NOT NULL AND length(scan_type) BETWEEN 1 AND 50
    AND payment_status IN ('pending','requires_payment','paid')
  );

-- =============================================================================
-- Function search_path hardening
-- Pin search_path so a malicious caller cannot shadow built-ins via custom
-- search_path objects.
-- =============================================================================
ALTER FUNCTION public.update_updated_at_column()      SET search_path = public, pg_temp;
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public, pg_temp;
ALTER FUNCTION public.generate_request_number()       SET search_path = public, pg_temp;
ALTER FUNCTION public.handle_new_user()               SET search_path = public, pg_temp;
ALTER FUNCTION public.update_last_sign_in()           SET search_path = public, pg_temp;
ALTER FUNCTION public.user_has_role(public.app_role)  SET search_path = public, pg_temp;
ALTER FUNCTION public.user_has_any_role(public.app_role[]) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_user_role()                 SET search_path = public, pg_temp;
