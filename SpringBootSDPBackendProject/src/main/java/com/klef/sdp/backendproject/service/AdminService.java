package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.*;

import java.util.List;

public interface AdminService {
    List<UserResponseDTO> listAllUsers(String adminUserId);
    UserDetailsResponseDTO getUserDetails(String targetUserId, String adminUserId);
    UserResponseDTO updateUserStatus(String targetUserId, UpdateUserStatusRequestDTO request);
    List<DonationResponseDTO> listAllDonations(String adminUserId);
    DonationResponseDTO overrideDonationStatus(String donationId, UpdateDonationStatusRequestDTO request);
    AnalyticsReportResponseDTO generateAnalyticsReport(String adminUserId);
    AuditDonationResponseDTO auditDonation(String donationId, AuditDonationRequestDTO request);
}