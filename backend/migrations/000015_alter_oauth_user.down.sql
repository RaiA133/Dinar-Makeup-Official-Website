ALTER TABLE users
    DROP COLUMN IF EXISTS google_id,
    DROP COLUMN IF EXISTS login_provider,
    DROP COLUMN IF EXISTS is_oauth,
    DROP COLUMN IF EXISTS verified_email;
