package mn_react.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import mn_react.entities.User;
import mn_react.repositories.UserRepository;

@Singleton
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Inject
    private UserRepository userRepository;

    public boolean authenticate(String email, String password) {
        log.info("Authenticating user with email: {}", email);
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            log.warn("User not found with email: {}", email);
            return false;
        }

        User user = userOpt.get();
        log.info("User found: {} (enabled: {})", user.getName(), user.isEnabled());
        
        boolean passwordMatch = BCrypt.checkpw(password, user.getPassword());
        log.info("Password match: {}", passwordMatch);
        
        return user.isEnabled() && passwordMatch;
    }

    public User createUser(String email, String password, String name, User.Role role) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        
        User user = User.builder()
            .email(email)
            .password(hashedPassword)
            .name(name)
            .role(role != null ? role : User.Role.USER)
            .enabled(true)
            .build();

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}