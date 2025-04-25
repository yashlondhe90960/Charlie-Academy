package com.charlie.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Resource;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {

    /**
     * Find resources by course ID.
     */
    List<Resource> findByCourseId(int courseId);

    /**
     * Find a resource by its URL.
     */
    Resource findByResourceUrl(String resourceUrl);
}