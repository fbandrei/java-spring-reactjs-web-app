package com.symw.security;

import com.symw.entity.CustomUserDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtTokenProvider {

    private static final Logger LOGGER = Logger.getLogger(JwtTokenProvider.class.getName());

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMilliSeconds;

    public String generateToken(Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMilliSeconds);

        return Jwts.builder()
                .setSubject(Long.toString(customUserDetails.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            LOGGER.severe("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            LOGGER.severe("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            LOGGER.severe("Expired JWT token");
        } catch (IllegalArgumentException ex) {
            LOGGER.severe("JWT claims string is empty");
        } catch (UnsupportedJwtException ex) {
            LOGGER.severe("Unsupported JWT token");
        }

        return false;
    }
}
