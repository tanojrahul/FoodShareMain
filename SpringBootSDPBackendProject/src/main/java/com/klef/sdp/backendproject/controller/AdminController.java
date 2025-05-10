
package com.klef.sdp.backendproject.controller;

import com.klef.sdp.backendproject.dto.*;
import com.klef.sdp.backendproject.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping()
    public ResponseEntity<?> listAllUsers(@RequestParam String userId) {
        try {
            List<UserResponseDTO> users = adminService.listAllUsers(userId);
            return ResponseEntity.ok(Map.of("content", users));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to List Users: " + e.getMessage());
        }
    }

    @GetMapping("/users/{targetUserId}")
    public ResponseEntity<?> getUserDetails(@PathVariable String targetUserId, @RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.status(400).body("userId is required");
            }
            UserDetailsResponseDTO user = adminService.getUserDetails(targetUserId, userId);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Get User Details: " + e.getMessage());
        }
    }

    @PutMapping("/users/{targetUserId}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable String targetUserId, @RequestBody UpdateUserStatusRequestDTO request) {
        try {
            UserResponseDTO user = adminService.updateUserStatus(targetUserId, request);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Update User Status: " + e.getMessage());
        }
    }

    @GetMapping("/donations")
    public ResponseEntity<?> listAllDonations(@RequestParam String userId) {
        try {
            List<DonationResponseDTO> donations = adminService.listAllDonations(userId);
            return ResponseEntity.ok(Map.of("content", donations));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to List Donations: " + e.getMessage());
        }
    }
    @PutMapping("/donations/{donationId}/status")
    public ResponseEntity<?> overrideDonationStatus(@PathVariable String donationId, @RequestBody UpdateDonationStatusRequestDTO request) {
        try {
            DonationResponseDTO donation = adminService.overrideDonationStatus(donationId, request);
            return ResponseEntity.ok(donation);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Override Donation Status: " + e.getMessage());
        }
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> generateAnalyticsReport(@RequestParam String userId) {
        try {
            AnalyticsReportResponseDTO report = adminService.generateAnalyticsReport(userId);
            return ResponseEntity.ok(report);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Generate Analytics Report: " + e.getMessage());
        }
    }

    @PutMapping("/donations/{donationId}/audit")
    public ResponseEntity<?> auditDonation(@PathVariable String donationId, @RequestBody AuditDonationRequestDTO request) {
        try {
            AuditDonationResponseDTO response = adminService.auditDonation(donationId, request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Invalid Request: " + e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Audit Donation: " + e.getMessage());
        }
    }
}
