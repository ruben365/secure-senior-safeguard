-- Ensure zoom_classes SELECT policy is correct and idempotent
DROP POLICY IF EXISTS "Users can view enrolled zoom classes" ON public.zoom_classes;
CREATE POLICY "Users can view enrolled zoom classes"
ON public.zoom_classes
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.zoom_class_enrollments e
    WHERE e.class_id = public.zoom_classes.id
      AND e.user_id = auth.uid()
  )
);

-- Allow public inserts into subscribers for newsletter signups
DROP POLICY IF EXISTS "Public can insert subscribers" ON public.subscribers;
CREATE POLICY "Public can insert subscribers"
ON public.subscribers
AS RESTRICTIVE
FOR INSERT
TO public
WITH CHECK (true);
