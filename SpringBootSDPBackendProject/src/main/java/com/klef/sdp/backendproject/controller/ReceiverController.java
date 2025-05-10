package com.klef.sdp.backendproject.controller;

import com.klef.sdp.backendproject.dto.DonationRequestRequestDTO;
import com.klef.sdp.backendproject.dto.DonationRequestResponseDTO;
import com.klef.sdp.backendproject.service.ReceiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/receiver")
@CrossOrigin("*")
public class ReceiverController {
    @Autowired
    private ReceiverService receiverService; 

    @PostMapping
    public ResponseEntity<?> createDonationRequest(@RequestBody DonationRequestRequestDTO request) {
        try {
            DonationRequestResponseDTO response = receiverService.createDonationRequest(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Create Donation Request: " + e.getMessage());
        }
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<?> cancelDonationRequest(@PathVariable String requestId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body("userId is required");
            }
            String response = receiverService.cancelDonationRequest(requestId, userId);
            return ResponseEntity.ok(Map.of("message", response));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Cancel Donation Request: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listDonationRequests(@RequestParam(required = false) String userId,
                                                 @RequestParam(required = false) String status) {
        try {
            List<DonationRequestResponseDTO> response = receiverService.listDonationRequests(userId, status);
            return ResponseEntity.ok(Map.of("content", response));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to List Donation Requests: " + e.getMessage());
        }
    }

    @PutMapping("/{requestId}/approve")
    public ResponseEntity<?> approveDonationRequest(@PathVariable String requestId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body("userId is required");
            }
            DonationRequestResponseDTO response = receiverService.approveDonationRequest(requestId, userId);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Approve Donation Request: " + e.getMessage());
        }
    }
}
