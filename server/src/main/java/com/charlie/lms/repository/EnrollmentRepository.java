package com.charlie.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Enrollment;

import java.util.*;
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    /**
     * Find an enrollment by course ID and student ID.
     */
    
    Optional<Enrollment> findByCourseIDAndStudentid(int courseID, int studentid);
    List<Enrollment> findByCourseID(int courseID);
     List<Enrollment> findByStudentid(int studentid);
}
