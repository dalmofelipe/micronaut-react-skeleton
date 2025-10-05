-- Increase content column size to allow longer Markdown posts
-- Use TEXT/CLOB to accept arbitrary-length content and avoid varchar length issues.
-- Use quoted identifiers to match the existing migration which created quoted, lowercase column names.
ALTER TABLE "TB_BLOG_POSTS" ALTER COLUMN "content" TEXT;
