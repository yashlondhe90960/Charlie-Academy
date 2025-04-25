package com.charlie.lms.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Assessment;
import com.charlie.lms.model.Attempt;
@Repository
public interface AttemptRepository extends JpaRepository<Attempt, Integer> {
    List<Assessment> findByAssessmentID(int assessmentID);
	
}