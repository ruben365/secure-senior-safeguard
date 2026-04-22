-- ============================================================
-- Admin Forms & Comment Moderation tables
-- ============================================================

-- Generic form submissions store
CREATE TABLE IF NOT EXISTS form_submissions (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type   text        NOT NULL,
  submitted_by uuid       REFERENCES auth.users(id) ON DELETE SET NULL,
  submitter_name  text,
  submitter_email text,
  data        jsonb       NOT NULL DEFAULT '{}',
  status      text        NOT NULL DEFAULT 'submitted'
                          CHECK (status IN ('submitted','reviewed','archived')),
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status    ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created   ON form_submissions(created_at DESC);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Admins & staff can do everything; public cannot read
CREATE POLICY "admin_all_form_submissions"
  ON form_submissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin','super_admin','staff')
    )
  );

-- Authenticated users can submit their own forms
CREATE POLICY "user_insert_form_submissions"
  ON form_submissions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── Comments moderation ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name  text        NOT NULL,
  author_email text,
  content      text        NOT NULL,
  page_url     text,
  status       text        NOT NULL DEFAULT 'pending'
                           CHECK (status IN ('pending','approved','rejected','flagged')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  reviewed_by  uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at  timestamptz
);

CREATE INDEX IF NOT EXISTS idx_comments_status  ON comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_created ON comments(created_at DESC);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Public can insert (submit feedback/testimonials)
CREATE POLICY "public_insert_comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- Public can read approved comments only
CREATE POLICY "public_read_approved_comments"
  ON comments FOR SELECT
  USING (status = 'approved');

-- Admins can read all and modify all
CREATE POLICY "admin_all_comments"
  ON comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin','super_admin','staff')
    )
  );

-- Auto-update updated_at on form_submissions
CREATE OR REPLACE FUNCTION update_form_submissions_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_form_submissions_updated_at
  BEFORE UPDATE ON form_submissions
  FOR EACH ROW EXECUTE FUNCTION update_form_submissions_updated_at();
