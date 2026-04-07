-- =============================================================================
-- Phase 2 Security Hardening - Apr 2026 audit
-- Fixes 9 ERROR-level "rls_disabled_in_public" advisors.
-- Enables RLS and adds policies on 9 customer-facing tables that were
-- discovered to have RLS disabled and zero policies in production.
-- =============================================================================

-- ----- 1) COURSES (public read of published, staff write) --------------------
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published courses"   ON public.courses;
DROP POLICY IF EXISTS "Staff can manage courses"            ON public.courses;

CREATE POLICY "Public can view published courses"
  ON public.courses FOR SELECT
  USING (
    COALESCE(status, 'published') IN ('published','active')
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  );

CREATE POLICY "Staff can manage courses"
  ON public.courses FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  );

-- ----- 2) COURSE_MODULES (public read of structure, staff write) -------------
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view course modules" ON public.course_modules;
DROP POLICY IF EXISTS "Staff can manage course modules" ON public.course_modules;

CREATE POLICY "Public can view course modules"
  ON public.course_modules FOR SELECT
  USING (true);

CREATE POLICY "Staff can manage course modules"
  ON public.course_modules FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  );

-- ----- 3) COURSE_LESSONS (public read of titles, staff write) ----------------
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view course lessons" ON public.course_lessons;
DROP POLICY IF EXISTS "Staff can manage course lessons" ON public.course_lessons;

CREATE POLICY "Public can view course lessons"
  ON public.course_lessons FOR SELECT
  USING (true);

CREATE POLICY "Staff can manage course lessons"
  ON public.course_lessons FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'training_coordinator'::public.app_role)
    OR public.has_role(auth.uid(), 'trainer'::public.app_role)
  );

-- ----- 4) BOOK_PURCHASES (PII - owner read, admin write, no anon writes) ----
ALTER TABLE public.book_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own book purchases"  ON public.book_purchases;
DROP POLICY IF EXISTS "Admins can manage book purchases"   ON public.book_purchases;

CREATE POLICY "Users can view own book purchases"
  ON public.book_purchases FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Admins can manage book purchases"
  ON public.book_purchases FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- ----- 5) BOOK_REQUESTS (anyone can submit, owner/admin can read) ------------
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit book requests"     ON public.book_requests;
DROP POLICY IF EXISTS "Users can view own book requests"    ON public.book_requests;
DROP POLICY IF EXISTS "Staff can manage book requests"      ON public.book_requests;

CREATE POLICY "Anyone can submit book requests"
  ON public.book_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_id IS NULL
    OR user_id = auth.uid()
  );

CREATE POLICY "Users can view own book requests"
  ON public.book_requests FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  );

CREATE POLICY "Staff can manage book requests"
  ON public.book_requests FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  );

-- ----- 6) REFERRAL_CODES (owner read/insert, admin manage) -------------------
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own referral codes"   ON public.referral_codes;
DROP POLICY IF EXISTS "Users can create referral codes"     ON public.referral_codes;
DROP POLICY IF EXISTS "Admins can manage referral codes"    ON public.referral_codes;

CREATE POLICY "Users can view own referral codes"
  ON public.referral_codes FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Users can create referral codes"
  ON public.referral_codes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage referral codes"
  ON public.referral_codes FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- ----- 7) REFERRAL_TRACKING (owner read via FK, no direct writes) ------------
ALTER TABLE public.referral_tracking ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own referral tracking" ON public.referral_tracking;
DROP POLICY IF EXISTS "Admins can manage referral tracking"  ON public.referral_tracking;

CREATE POLICY "Users can view own referral tracking"
  ON public.referral_tracking FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.referral_codes rc
      WHERE rc.id = referral_tracking.referral_code_id
        AND rc.user_id = auth.uid()
    )
    OR public.has_role(auth.uid(), 'admin'::public.app_role)
  );

CREATE POLICY "Admins can manage referral tracking"
  ON public.referral_tracking FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- ----- 8) QUOTES (PII - anyone can submit, only staff can read) --------------
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit quotes"   ON public.quotes;
DROP POLICY IF EXISTS "Staff can view quotes"      ON public.quotes;
DROP POLICY IF EXISTS "Staff can manage quotes"    ON public.quotes;

CREATE POLICY "Anyone can submit quotes"
  ON public.quotes FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND length(email) BETWEEN 5 AND 320 AND email LIKE '%@%.%'
    AND (phone IS NULL OR length(phone) BETWEEN 5 AND 50)
    AND (service_type IS NULL OR length(service_type) BETWEEN 1 AND 100)
    AND (message IS NULL OR length(message) BETWEEN 1 AND 10000)
  );

CREATE POLICY "Staff can view quotes"
  ON public.quotes FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'business_consultant'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  );

CREATE POLICY "Staff can manage quotes"
  ON public.quotes FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'business_consultant'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  );

-- ----- 9) ENQUIRIES (PII - anyone submit, only staff read) -------------------
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit enquiries"   ON public.enquiries;
DROP POLICY IF EXISTS "Staff can view enquiries"      ON public.enquiries;
DROP POLICY IF EXISTS "Staff can manage enquiries"    ON public.enquiries;

CREATE POLICY "Anyone can submit enquiries"
  ON public.enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND length(email) BETWEEN 5 AND 320 AND email LIKE '%@%.%'
    AND (phone IS NULL OR length(phone) BETWEEN 5 AND 50)
    AND (subject IS NULL OR length(subject) BETWEEN 1 AND 200)
    AND (message IS NULL OR length(message) BETWEEN 1 AND 10000)
  );

CREATE POLICY "Staff can view enquiries"
  ON public.enquiries FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  );

CREATE POLICY "Staff can manage enquiries"
  ON public.enquiries FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
    OR public.has_role(auth.uid(), 'support_specialist'::public.app_role)
  );
