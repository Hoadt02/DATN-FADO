package com.fado.watch.security.jwt;

import com.fado.watch.security.userprincal.customer.CustomerUserPrinciple;
import com.fado.watch.security.userprincal.staff.StaffUserPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
    private String jwtSecret = "do_tat_hoa_dep_trai";
    private int jwtExpiration = 86400;

    public String createTokenStaff(Authentication authentication){
        StaffUserPrinciple staffPrinciple = (StaffUserPrinciple) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(staffPrinciple.getUsername())
                .claim("id", staffPrinciple.getId())
                .claim("name", staffPrinciple.getFirstname() + " " + staffPrinciple.getLastname())
                .claim("authority", staffPrinciple.getRole().getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+jwtExpiration*1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String createTokenCustomer(Authentication authentication){
        CustomerUserPrinciple customerPrinciple = (CustomerUserPrinciple) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(customerPrinciple.getUsername())
                .claim("id", customerPrinciple.getId())
                .claim("name", customerPrinciple.getFirstname() + " " + customerPrinciple.getLastname())
                .claim("authority", customerPrinciple.getRole().getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+jwtExpiration*1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public boolean validateToken(String token){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e){
            logger.error("Ivalid JWT sinature ->Message: {}", e);
        } catch (MalformedJwtException e){
            logger.error("The token invalid format ->Message: {}",e);
        } catch (UnsupportedJwtException e){
            logger.error("Unsupported JWT toekn ->Message: {}",e);
        } catch (ExpiredJwtException e){
            logger.error("Expired JWT Token -> Message: {}",e);
        } catch (IllegalArgumentException e){
            logger.error("Jwt claims string is empty -> Message {}",e);
        }
        return false;
    }

    public String getUserNameFromToken(String token){
        String userName = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        return userName;
    }

    public String getAuthorityFromToken(String token){
        String authority = getAllClaimsFromToken(token).get("authority").toString();
        return authority;
    }

    private Claims getAllClaimsFromToken(String token){
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }
}
