package mn_react;

import java.util.List;

import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import mn_react.entities.Book;
import mn_react.repositories.BookRepository;

@Singleton
public class DataLoader implements ApplicationEventListener<ServerStartupEvent> {
    
    @Inject private BookRepository bookRepository;

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        if(bookRepository.count() == 0) {
            var b1 = Book.builder().title("The Lord of the Rings").pages(1178).build();
            var b2 = Book.builder().title("The Hobbit").pages(310).build();
            var b3 = Book.builder().title("Harry Potter").pages(223).build();

            bookRepository.saveAll(List.of(b1, b2, b3));
        }
    }
}
