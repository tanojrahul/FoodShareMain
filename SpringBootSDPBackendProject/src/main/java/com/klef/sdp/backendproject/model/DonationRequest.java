package com.klef.sdp.backendproject.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donation_requests")
public class DonationRequest {
    @Id
    @Column(name = "request_id", length = 36)
    private String request_id;

    @ManyToOne
    @JoinColumn(name = "donation_id", nullable = false)
    private Donations donation;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id", nullable = false)
    private Users beneficiary;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "requested_at", nullable = false)
    private LocalDateTime requested_at;

    public enum Status {
        pending, approved, rejected, cancelled
    }

    // Getters and Setters
    public String getRequest_id() {
        return request_id;
    }

    public void setRequest_id(String request_id) {
        this.request_id = request_id;
    }

    public Donations getDonation() {
        return donation;
    }

    public void setDonation(Donations donation) {
        this.donation = donation;
    }

    public Users getBeneficiary() {
        return beneficiary;
    }

    public void setBeneficiary(Users beneficiary) {
        this.beneficiary = beneficiary;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getRequested_at() {
        return requested_at;
    }

    public void setRequested_at(LocalDateTime requested_at) {
        this.requested_at = requested_at;
    }
}