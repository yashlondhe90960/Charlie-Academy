package com.charlie.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Instructor;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
    
    /**
     * Find an instructor by email.
     */
    Optional<Instructor> findByEmail(String email);
}
