
package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.DonationRequestRequestDTO;
import com.klef.sdp.backendproject.dto.DonationRequestResponseDTO;
import com.klef.sdp.backendproject.model.DonationRequest;
import com.klef.sdp.backendproject.model.Donations;
import com.klef.sdp.backendproject.model.Users;
import com.klef.sdp.backendproject.repository.DonationRequestRepository;
import com.klef.sdp.backendproject.repository.DonationsRepository;
import com.klef.sdp.backendproject.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReceiverServiceImpl implements ReceiverService {
    @Autowired
    private DonationRequestRepository donationRequestRepository;

    @Autowired
    private DonationsRepository donationsRepository;

    @Autowired
    private UsersRepository usersRepository;

    private DonationRequestResponseDTO mapToResponseDTO(DonationRequest request) {
        DonationRequestResponseDTO dto = new DonationRequestResponseDTO();
        dto.setRequestId(request.getRequest_id());
        dto.setDonationId(request.getDonation().getDonation_id());
        dto.setBeneficiaryId(request.getBeneficiary().getUser_id());
        dto.setStatus(request.getStatus().name());
        dto.setRequestedAt(request.getRequested_at());
        return dto;
    }

    @Override
    public DonationRequestResponseDTO createDonationRequest(DonationRequestRequestDTO request) {
        // Validate inputs
        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            throw new IllegalArgumentException("userId is required");
        }
        if (request.getDonationId() == null || request.getDonationId().isEmpty()) {
            throw new IllegalArgumentException("donationId is required");
        }

        // Fetch user and donation
        Optional<Users> userOptional = usersRepository.findById(request.getUserId());
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + request.getUserId());
        }
        Users user = userOptional.get();
        if (!"beneficiary".equals(user.getRole())) {
            throw new IllegalArgumentException("Only beneficiaries can request donations");
        }

        Optional<Donations> donationOptional = donationsRepository.findById(request.getDonationId());
        if (!donationOptional.isPresent()) {
            throw new IllegalArgumentException("Donation not found with ID: " + request.getDonationId());
        }
        Donations donation = donationOptional.get();
        if (!Donations.Status.available.equals(donation.getStatus())) {
            throw new IllegalArgumentException("Donation is not available for request");
        }

        // Create donation request
        DonationRequest donationRequest = new DonationRequest();
        donationRequest.setRequest_id(UUID.randomUUID().toString());
        donationRequest.setDonation(donation);
        donationRequest.setBeneficiary(user);
        donationRequest.setStatus(DonationRequest.Status.pending);
        donationRequest.setRequested_at(LocalDateTime.now());

        DonationRequest savedRequest = donationRequestRepository.save(donationRequest);
        return mapToResponseDTO(savedRequest);
    }
    @Override
    public String cancelDonationRequest(String requestId, String userId) {
        Optional<DonationRequest> requestOptional = donationRequestRepository.findById(requestId);
        if (requestOptional.isPresent()) {
            DonationRequest request = requestOptional.get();
            if (!request.getBeneficiary().getUser_id().equals(userId)) {
                return "Unauthorized: Only the beneficiary can cancel this request";
            }
            if (!DonationRequest.Status.pending.equals(request.getStatus())) {
                return "Cannot cancel a request that is not pending";
            }
            request.setStatus(DonationRequest.Status.cancelled);
            donationRequestRepository.save(request);
            return "Request cancelled successfully";
        }
        return "Request ID not found";
    }

    @Override
    public List<DonationRequestResponseDTO> listDonationRequests(String userId, String status) {
        List<DonationRequest> requests;
        if (status != null && !status.isEmpty()) {
            try {
                DonationRequest.Status requestStatus = DonationRequest.Status.valueOf(status);
                requests = donationRequestRepository.findByBeneficiaryUserIdAndStatus(userId, requestStatus);
            } catch (IllegalArgumentException e) {
                requests = donationRequestRepository.findByBeneficiaryUserId(userId);
            }
        } else {
            requests = donationRequestRepository.findByBeneficiaryUserId(userId);
        }
        return requests.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    @Override
    public DonationRequestResponseDTO approveDonationRequest(String requestId, String userId) {
        Optional<DonationRequest> requestOptional = donationRequestRepository.findById(requestId);
        if (requestOptional.isPresent()) {
            DonationRequest request = requestOptional.get();
            // Verify the user is the donor of the donation
            if (!request.getDonation().getUser().getUser_id().equals(userId)) {
                throw new IllegalArgumentException("Unauthorized: Only the donor can approve this request");
            }
            if (!DonationRequest.Status.pending.equals(request.getStatus())) {
                throw new IllegalArgumentException("Cannot approve a request that is not pending");
            }
            request.setStatus(DonationRequest.Status.approved);
            donationRequestRepository.save(request);
            // Update donation status to requested
            Donations donation = request.getDonation();
            donation.setStatus(Donations.Status.requested);
            donationsRepository.save(donation);
            return mapToResponseDTO(request);
        }
        throw new IllegalArgumentException("Request ID not found");
    }
}
