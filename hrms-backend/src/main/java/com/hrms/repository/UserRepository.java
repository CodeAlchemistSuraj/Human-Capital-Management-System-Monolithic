package com.hrms.repository;

import com.hrms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; // Import Optional

public interface UserRepository extends JpaRepository<User, String> {
    // Change the return type to Optional<User>
    Optional<User> findByUsername(String username);
}
