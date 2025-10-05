-- V2: Create blog posts table for blog system
CREATE TABLE "TB_BLOG_POSTS" (
    "id" BIGSERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) UNIQUE NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP
);