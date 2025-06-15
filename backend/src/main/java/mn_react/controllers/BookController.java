package mn_react.controllers;

import java.util.List;
import java.util.Optional;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import jakarta.inject.Inject;
import mn_react.entities.Book;
import mn_react.repositories.BookRepository;

@Controller("/books")
public class BookController {

    @Inject 
    BookRepository bookRepository;

    @Get
    HttpResponse<List<Book>> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        
        return HttpResponse.ok().body(books);
    }
    
    @Get("/{id}")
    HttpResponse<Book> getBook(@PathVariable Long id) {
        Optional<Book> opt = bookRepository.findById(id);
        
        return opt.map(HttpResponse::ok).orElseGet(() -> HttpResponse.notFound());
    }
}
