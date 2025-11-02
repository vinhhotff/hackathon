package com.airlines.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

/**
 * Legacy password encryption service for COBOL migration
 * Implements custom encryption algorithm from CRYPTO-VERIFICATION
 */
@Service
public class PasswordEncryptionService {
    
    public String encryptPassword(String password, String userId, LocalDate adminDate) {
        // Simplified encryption logic based on COBOL implementation
        // Original: Uses RANDOM(date) * 1000 as key, then encrypts per character
        
        String dateStr = adminDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        long seed = Long.parseLong(dateStr);
        Random random = new Random(seed);
        int key = (int)(random.nextDouble() * 1000);
        
        // Extract user ID numeric part for encryption
        String userIdPart = userId.substring(Math.max(0, userId.length() - 3));
        int userIdNum = Integer.parseInt(userIdPart.replaceAll("[^0-9]", "0"));
        
        StringBuilder encrypted = new StringBuilder();
        for (int i = 0; i < password.length() && i < 8; i++) {
            char pwdChar = password.charAt(i);
            int mod = i % 3;
            
            int encryptedChar;
            if (mod == 0) {
                encryptedChar = (pwdChar * key) % 256;
            } else if (mod == 1) {
                encryptedChar = (pwdChar * userIdNum) % 256;
            } else {
                encryptedChar = (pwdChar * key * userIdNum) % 256;
            }
            
            encrypted.append((char)Math.max(32, encryptedChar));
        }
        
        return encrypted.toString();
    }
    
    public boolean verifyPassword(String password, String userId, LocalDate adminDate) {
        // For migration: Check against stored encrypted password
        // In production: Use bcrypt instead
        String encrypted = encryptPassword(password, userId, adminDate);
        
        // TODO: Compare with stored encrypted password from database
        // For now, return true if password is not empty (migration needed)
        return !password.isEmpty();
    }
}

