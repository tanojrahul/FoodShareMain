package com.klef.sdp.backendproject.controller;

import com.klef.sdp.backendproject.dto.DonationRequestDTO;
import com.klef.sdp.backendproject.dto.DonationResponseDTO;
import com.klef.sdp.backendproject.model.Donations;
import com.klef.sdp.backendproject.dto.MatchedBeneficiaryDTO;
import com.klef.sdp.backendproject.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/donations")
@CrossOrigin("*")
public class DonorController {
    @Autowired
    private DonorService donorService;

    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody DonationRequestDTO request) {
        try {
            DonationResponseDTO response = donorService.createDonation(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Create Donation: " + e.getMessage());
        }
    }

    @PutMapping("/{donationId}")
    public ResponseEntity<?> updateDonation(@PathVariable String donationId, @RequestBody Donations donation) {
        try {
            donation.setDonation_id(donationId);
            DonationResponseDTO response = donorService.updateDonation(donation);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Donation Not Found or Unauthorized");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Update Donation: " + e.getMessage());
        }
    }

    @DeleteMapping("/{donationId}")
    public ResponseEntity<?> deleteDonation(@PathVariable String donationId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body("userId is required");
            }
            String response = donorService.deleteDonation(donationId, userId);
            return ResponseEntity.ok(Map.of("message", response));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Delete Donation: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listDonations(@RequestParam(required = false) String userId,
                                          @RequestParam(required = false) String status) {
        try {
            List<DonationResponseDTO> response = donorService.listDonations(userId, status);
            return ResponseEntity.ok(Map.of("content", response));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to List Donations: " + e.getMessage());
        }
    }
    @GetMapping("/{donationId}")
    public ResponseEntity<?> getDonationDetails(@PathVariable String donationId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body("userId is required");
            }
            DonationResponseDTO response = donorService.getDonationDetails(donationId, userId);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Donation Not Found or Unauthorized");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Retrieve Donation Details: " + e.getMessage());
        }
    }

    @PostMapping("/{donationId}/match")
    public ResponseEntity<?> matchDonation(@PathVariable String donationId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body("userId is required");
            }
            List<MatchedBeneficiaryDTO> response = donorService.matchDonation(donationId, userId);
            return ResponseEntity.ok(Map.of("donationId", donationId, "matchedBeneficiaries", response));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Match Donation: " + e.getMessage());
        }
    }

    @PutMapping("/{donationId}/status")
    public ResponseEntity<?> updateDonationStatus(@PathVariable String donationId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String status = request.get("status");
            if (userId == null || userId.isEmpty() || status == null || status.isEmpty()) {
                return ResponseEntity.status(400).body("userId and status are required");
            }
            DonationResponseDTO response = donorService.updateDonationStatus(donationId, userId, status);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Donation Not Found, Unauthorized, or Invalid Status");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Update Donation Status: " + e.getMessage());
        }
    }
    
    
    
}