package com.charlie.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Find a user by email.
     */
    Optional<User> findByEmail(String email);
}