package mn_react.controllers;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.token.generator.TokenGenerator;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import mn_react.dto.AuthResponse;
import mn_react.dto.LoginRequest;
import mn_react.dto.RegisterRequest;
import mn_react.entities.User;
import mn_react.services.UserService;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import io.micronaut.http.annotation.Get;

@Controller("/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Inject
    private UserService userService;

    @Inject
    private TokenGenerator tokenGenerator;

    @Get("/test")
    public HttpResponse<String> test() {
        log.info("=== TEST ENDPOINT CALLED ===");
        return HttpResponse.ok("Auth controller is working!");
    }

    @Post("/login")
    public HttpResponse<?> login(@Body LoginRequest loginRequest) {
        try {
            log.info("=== LOGIN ATTEMPT START ===");
            log.info("Request received - Email: {}", loginRequest != null ? loginRequest.email() : "NULL");
            log.info("Request received - Password: {}", loginRequest != null && loginRequest.password() != null ? "PROVIDED" : "NULL");
            
            if (loginRequest == null) {
                log.error("LoginRequest is null");
                return HttpResponse.badRequest("Invalid request");
            }
            
            boolean isAuthenticated = userService.authenticate(loginRequest.email(), loginRequest.password());
            log.info("Authentication result: {}", isAuthenticated);
            
            if (isAuthenticated) {
                Optional<User> userOpt = userService.findByEmail(loginRequest.email());
                
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    
                    // Create claims for JWT
                    Map<String, Object> claims = new HashMap<>();
                    claims.put("sub", user.getEmail());
                    claims.put("roles", user.getRole().name());
                    claims.put("name", user.getName());
                    
                    Optional<String> tokenOpt = tokenGenerator.generateToken(claims);
                    
                    if (tokenOpt.isPresent()) {
                        AuthResponse response = new AuthResponse(
                            tokenOpt.get(),
                            user.getEmail(),
                            user.getName(),
                            user.getRole().name()
                        );
                        return HttpResponse.ok(response);
                    }
                }
            }
            
            log.warn("Authentication failed for email: {}", loginRequest.email());
            return HttpResponse.unauthorized();
        } catch (Exception e) {
            log.error("Login error for email: {}", loginRequest.email(), e);
            return HttpResponse.badRequest("Invalid credentials");
        }
    }

    @Post("/register")
    public HttpResponse<?> register(@Body @Valid RegisterRequest registerRequest) {
        try {
            User user = userService.createUser(
                registerRequest.email(),
                registerRequest.password(),
                registerRequest.name(),
                User.Role.USER
            );

            // Generate token for new user
            Map<String, Object> claims = new HashMap<>();
            claims.put("sub", user.getEmail());
            claims.put("roles", user.getRole().name());
            claims.put("name", user.getName());
            
            Optional<String> tokenOpt = tokenGenerator.generateToken(claims);
            
            if (tokenOpt.isPresent()) {
                AuthResponse response = new AuthResponse(
                    tokenOpt.get(),
                    user.getEmail(),
                    user.getName(),
                    user.getRole().name()
                );
                return HttpResponse.created(response);
            }

            return HttpResponse.serverError("Failed to generate token");
        } catch (IllegalArgumentException e) {
            return HttpResponse.badRequest(e.getMessage());
        } catch (Exception e) {
            return HttpResponse.serverError("Registration failed");
        }
    }
}