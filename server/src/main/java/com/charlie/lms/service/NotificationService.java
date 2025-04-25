package com.charlie.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.charlie.lms.model.Notification;
import com.charlie.lms.repository.NotificationRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Fetch all notifications from the repository.
     */
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    /**
     * Save a new notification with the given description.
     */
    public Notification saveNotification(String description) {
        Notification notification = new Notification(description, LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    /**
     * Fetch a notification by ID from the repository.
     */
    public Notification getNotificationById(int id) {
        return notificationRepository.findById(id).orElse(null);
    }

    /**
     * Delete a notification by ID from the repository.
     */
    public void deleteNotification(int id) {
        notificationRepository.deleteById(id);
    }
}