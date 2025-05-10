package com.klef.sdp.backendproject.service;


import com.klef.sdp.backendproject.dto.UserResponseDTO;
import com.klef.sdp.backendproject.model.Users;

public interface UserService {
    UserResponseDTO registerUser(Users user);
    UserResponseDTO loginUser(String email, String password);
    UserResponseDTO getUserProfile(String userId);
    UserResponseDTO updateUserProfile(Users user);
}
