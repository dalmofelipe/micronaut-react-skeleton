package mn_react.entities;

import java.time.LocalDateTime;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Serdeable
@MappedEntity(value = "TB_BLOG_POSTS")
public class BlogPost {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String slug;
    private String content; // Markdown content
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}