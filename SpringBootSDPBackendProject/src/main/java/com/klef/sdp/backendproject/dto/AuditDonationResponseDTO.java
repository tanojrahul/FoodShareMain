package com.klef.sdp.backendproject.dto;

public class AuditDonationResponseDTO {
    private String donationId;
    private String status;

    // Getters and Setters
    public String getDonationId() {
        return donationId;
    }

    public void setDonationId(String donationId) {
        this.donationId = donationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}