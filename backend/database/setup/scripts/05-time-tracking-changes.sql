ALTER TABLE public.time_tracking 
    ALTER COLUMN activity_duration 
    SET DATA TYPE TIMESTAMP 
    USING TO_TIMESTAMP(activity_duration);

ALTER TABLE public.time_tracking
    ALTER COLUMN activity_duration TYPE time without time zone ;