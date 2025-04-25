package com.charlie.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Course;
@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

    /**
     * Find a course by its title.
     */
    Optional<Course> findByTitle(String title);
    List<Course> findByInstructorID(int instructorID);
}