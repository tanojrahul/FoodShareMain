package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.DonationRequestRequestDTO;
import com.klef.sdp.backendproject.dto.DonationRequestResponseDTO;

import java.util.List;

public interface ReceiverService {
    DonationRequestResponseDTO createDonationRequest(DonationRequestRequestDTO request);
    String cancelDonationRequest(String requestId, String userId);
    List<DonationRequestResponseDTO> listDonationRequests(String userId, String status);
    DonationRequestResponseDTO approveDonationRequest(String requestId, String userId);
}
