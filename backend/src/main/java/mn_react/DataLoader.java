package mn_react;

import java.util.List;

import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import mn_react.entities.Book;
import mn_react.entities.User;
import mn_react.repositories.BookRepository;
import mn_react.services.UserService;

@Singleton
public class DataLoader implements ApplicationEventListener<ServerStartupEvent> {
    
    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);
    
    @Inject 
    private BookRepository bookRepository;
    
    @Inject
    private UserService userService;

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        // Load initial books
        if(bookRepository.count() == 0) {
            var b1 = Book.builder().title("The Lord of the Rings").pages(1178).build();
            var b2 = Book.builder().title("The Hobbit").pages(310).build();
            var b3 = Book.builder().title("Harry Potter").pages(223).build();

            bookRepository.saveAll(List.of(b1, b2, b3));
        }
        
        // Create default admin user
        if (!userService.findByEmail("admin@example.com").isPresent()) {
            log.info("Creating default admin user");
            userService.createUser("admin@example.com", "admin123", "Administrator", User.Role.ADMIN);
            log.info("Admin user created successfully");
        } else {
            log.info("Admin user already exists");
        }
        
        // Create default regular user
        if (!userService.findByEmail("user@example.com").isPresent()) {
            log.info("Creating default regular user");
            userService.createUser("user@example.com", "user123", "Regular User", User.Role.USER);
            log.info("Regular user created successfully");
        } else {
            log.info("Regular user already exists");
        }
    }
}
