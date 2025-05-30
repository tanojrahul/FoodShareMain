package com.klef.sdp.backendproject.repository;


import com.klef.sdp.backendproject.model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notifications, String> {
}
