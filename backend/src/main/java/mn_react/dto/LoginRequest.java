package mn_react.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Serdeable
public record LoginRequest(
    @NotBlank
    @Email
    String email,
    
    @NotBlank
    @Size(min = 6, max = 100)
    String password
) {}