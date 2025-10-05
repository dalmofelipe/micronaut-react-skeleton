package mn_react.controllers;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import jakarta.inject.Inject;
import mn_react.entities.BlogPost;
import mn_react.services.BlogPostService;

import java.util.List;
import java.util.Optional;

@Controller("/posts")
public class BlogPostController {

    @Inject
    BlogPostService blogPostService;

    @Get
    public HttpResponse<List<BlogPost>> getAllPosts() {
        List<BlogPost> posts = blogPostService.getAllPosts();
        return HttpResponse.ok(posts);
    }

    @Get("/{id}")
    public HttpResponse<BlogPost> getPost(@PathVariable Long id) {
        Optional<BlogPost> post = blogPostService.getPostById(id);
        return post.map(HttpResponse::ok).orElse(HttpResponse.notFound());
    }

    @Get("/slug/{slug}")
    public HttpResponse<BlogPost> getPostBySlug(@PathVariable String slug) {
        Optional<BlogPost> post = blogPostService.getPostBySlug(slug);
        return post.map(HttpResponse::ok).orElse(HttpResponse.notFound());
    }

    @Post
    public HttpResponse<BlogPost> createPost(@Body BlogPost newPost) {
        BlogPost savedPost = blogPostService.createPost(newPost);
        return HttpResponse.ok(savedPost);
    }

    @Put("/{id}")
    public HttpResponse<BlogPost> updatePost(@PathVariable Long id, @Body BlogPost post) {
        Optional<BlogPost> updatedPost = blogPostService.updatePost(id, post);
        return updatedPost.map(HttpResponse::ok).orElse(HttpResponse.notFound());
    }

    @Delete("/{id}")
    public HttpResponse<?> deletePost(@PathVariable Long id) {
        boolean deleted = blogPostService.deletePost(id);
        return deleted ? HttpResponse.noContent() : HttpResponse.notFound();
    }
}