package com.klef.sdp.backendproject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLogs {
    @Id
    @Column(length = 36)
    private String audit_id;

    @ManyToOne
    @JoinColumn(name = "donation_id", nullable = false)
    private Donations donation;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Users admin;

    @Column(length = 255, nullable = false)
    private String action;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false)
    private LocalDateTime created_at;

    // Getters and Setters
    public String getAudit_id() {
        return audit_id;
    }

    public void setAudit_id(String audit_id) {
        this.audit_id = audit_id;
    }

    public Donations getDonation() {
        return donation;
    }

    public void setDonation(Donations donation) {
        this.donation = donation;
    }

    public Users getAdmin() {
        return admin;
    }

    public void setAdmin(Users admin) {
        this.admin = admin;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
