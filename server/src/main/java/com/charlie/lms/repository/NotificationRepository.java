package com.charlie.lms.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.charlie.lms.model.Notification;
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    // JpaRepository provides CRUD operations for Notification entity
}