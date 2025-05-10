package com.klef.sdp.backendproject.controller;

import com.klef.sdp.backendproject.dto.UserResponseDTO;
import com.klef.sdp.backendproject.model.Users;
import com.klef.sdp.backendproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("users/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            UserResponseDTO response = userService.registerUser(user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Register User: " + e.getMessage());
        }
    }

    @PostMapping("auth/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) {
        try {
            UserResponseDTO response = userService.loginUser(user.getEmail(), user.getPassword_hash());
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body("Invalid Email or Password");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable String userId) {
        try {
            UserResponseDTO response = userService.getUserProfile(userId);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("User Not Found");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Retrieve Profile: " + e.getMessage());
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String userId, @RequestBody Users user) {
        try {
            user.setUser_id(userId);
            UserResponseDTO response = userService.updateUserProfile(user);
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("User Not Found");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Failed to Update Profile: " + e.getMessage());
        }
    }
}
