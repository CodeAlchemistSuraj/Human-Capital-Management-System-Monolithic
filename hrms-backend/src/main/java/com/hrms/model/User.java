package com.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; // Import UserDetails

@Entity
@Table(name = "users")
public class User implements UserDetails { // FIX: Implement UserDetails interface

    @Id
    @Column(nullable = false, unique = true)
    private String username; // Assuming username is the primary key and unique

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // e.g., "HR", "EMPLOYEE"

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Constructors
    public User() {}

    public User(String username, String password, String role, String email, LocalDateTime createdAt) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.createdAt = createdAt;
    }

    // Getters and Setters for entity properties
    // Note: Spring Security's UserDetails interface requires getUsername() and getPassword()
    // which are implemented below, overriding these if they were standard getters.

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // --- UserDetails Interface Implementations (FIXED/ADDED) ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return a collection of GrantedAuthority objects based on the user's role.
        // Spring Security roles should typically start with "ROLE_".
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // For simplicity, assume accounts do not expire
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // For simplicity, assume accounts are not locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // For simplicity, assume credentials do not expire
    }

    @Override
    public boolean isEnabled() {
        return true; // For simplicity, assume accounts are always enabled
    }

    @Override
    public String getPassword() {
        // Override for UserDetails: returns the entity's password
        return this.password;
    }

    @Override
    public String getUsername() {
        // Override for UserDetails: returns the entity's username
        return this.username;
    }
}
