package mn_react.services;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import mn_react.entities.BlogPost;
import mn_react.repositories.BlogPostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Singleton
public class BlogPostService {

    @Inject
    BlogPostRepository blogPostRepository;

    public List<BlogPost> getAllPosts() {
        return (List<BlogPost>) blogPostRepository.findAll();
    }

    public Optional<BlogPost> getPostById(Long id) {
        return blogPostRepository.findById(id);
    }

    public Optional<BlogPost> getPostBySlug(String slug) {
        return blogPostRepository.findBySlug(slug);
    }

    public BlogPost createPost(BlogPost post) {
        // Verificar se slug já existe
        if (blogPostRepository.findBySlug(post.getSlug()).isPresent()) {
            throw new IllegalArgumentException("Slug já existe: " + post.getSlug());
        }
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return blogPostRepository.save(post);
    }

    public Optional<BlogPost> updatePost(Long id, BlogPost post) {
        Optional<BlogPost> existingPost = blogPostRepository.findById(id);
        if (existingPost.isPresent()) {
            BlogPost existing = existingPost.get();
            // Merge allowed updatable fields from incoming post and preserve createdAt
            existing.setTitle(post.getTitle());
            existing.setSlug(post.getSlug());
            existing.setContent(post.getContent());
            existing.setUpdatedAt(LocalDateTime.now());
            return Optional.of(blogPostRepository.update(existing));
        }
        return Optional.empty();
    }

    public boolean deletePost(Long id) {
        Optional<BlogPost> post = blogPostRepository.findById(id);
        if (post.isPresent()) {
            blogPostRepository.deleteById(id);
            return true;
        }
        return false;
    }
}