package com.charlie.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Video;

import jakarta.transaction.Transactional;
@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {
 
    List<Video> findByCourseId(int courseID);
    Optional<Video> findByTitle(String title);
    
}