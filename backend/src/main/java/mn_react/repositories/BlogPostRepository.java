package mn_react.repositories;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.entities.BlogPost;

import java.util.Optional;

@JdbcRepository(dialect = Dialect.H2)
public interface BlogPostRepository extends CrudRepository<BlogPost, Long> {

    // Micronaut Data gerará automaticamente os métodos CRUD
    // findAll(), findById(), save(), update(), deleteById(), etc.

    Optional<BlogPost> findBySlug(String slug);

}