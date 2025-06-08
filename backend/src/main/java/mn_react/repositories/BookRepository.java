package mn_react.repositories;

import java.util.List;
import java.util.Optional;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.entities.Book;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface BookRepository extends CrudRepository<Book, Long> {

    @Query(value = "INSERT INTO TB_BOOKS(title, pages) VALUES (:title, :pages)", nativeQuery = true)
    Book save(String title, int pages);
    
    default List<Book> saveAll(List<Book> entities) {
        for (Book entity : entities) {
            save(entity.getTitle(), entity.getPages());
        }
        return entities;
    }

    @Override
    @Query(value = "SELECT * FROM TB_BOOKS", nativeQuery = true)
    List<Book> findAll();

    @Override
    @Query(value = "SELECT * FROM TB_BOOKS b WHERE b.id = :id", nativeQuery = true)
    Optional<Book> findById(Long id);

}
