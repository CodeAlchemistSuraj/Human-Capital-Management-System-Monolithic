package com.hrms.service;

import com.hrms.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(String username);  // Changed Long to String
    User createUser(User user);
    User updateUser(String username, User user);  // Changed Long to String
    void deleteUser(String username);  // Changed Long to String
}