package com.airlines.filter;

import com.airlines.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        // Skip JWT filter for auth endpoints, OPTIONS requests, and error endpoints
        String path = request.getRequestURI();
        String method = request.getMethod();
        
        if (path != null) {
            // Skip for auth endpoints
            if (path.startsWith("/api/auth/")) {
                filterChain.doFilter(request, response);
                return;
            }
            // Skip for error endpoints
            if (path.startsWith("/error")) {
                filterChain.doFilter(request, response);
                return;
            }
            // Skip for OPTIONS (CORS preflight)
            if ("OPTIONS".equalsIgnoreCase(method)) {
                filterChain.doFilter(request, response);
                return;
            }
        }
        
        final String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        try {
            final String jwt = authHeader.substring(7);
            final String empId = jwtService.extractUsername(jwt);
            
            if (empId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if (jwtService.validateToken(jwt, empId)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        empId,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // If token is invalid, continue filter chain without authentication
            // Spring Security will handle unauthorized access
            if (logger.isDebugEnabled()) {
                logger.debug("JWT validation failed: " + e.getMessage());
            }
            // Don't set authentication - let Spring Security handle it
        }
        
        filterChain.doFilter(request, response);
    }
}

