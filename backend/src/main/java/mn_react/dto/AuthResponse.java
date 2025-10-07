package mn_react.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record AuthResponse(
    String token,
    String email,
    String name,
    String role
) {}