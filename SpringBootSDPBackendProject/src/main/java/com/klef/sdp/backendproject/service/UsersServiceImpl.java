package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.UserResponseDTO;
import com.klef.sdp.backendproject.model.Users;
import com.klef.sdp.backendproject.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersServiceImpl implements UserService {

    @Autowired
    private UsersRepository usersRepository;

    private UserResponseDTO mapToResponseDTO(Users user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setUserId(user.getUser_id());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setPostalCode(user.getPostalCode());
        dto.setCountry(user.getCountry());
        dto.setLatitude(user.getLatitude());
        dto.setLongitude(user.getLongitude());
        dto.setIsActive(user.getIs_active());
        return dto;
    }

    @Override
    public UserResponseDTO registerUser(Users user) {
        if (user.getPassword_hash() == null || user.getPassword_hash().isEmpty()) {
            throw new IllegalArgumentException("Password must not be null or empty");
        }
        user.setUser_id(UUID.randomUUID().toString());
        user.setCreated_at(LocalDateTime.now());
        user.setUpdated_at(LocalDateTime.now());
        user.setIs_active(true);
        Users savedUser = usersRepository.save(user);
        return mapToResponseDTO(savedUser);
    }

    @Override
    public UserResponseDTO loginUser(String email, String password) {
        Users user = usersRepository.findByEmailAndPassword(email, password);
        if (user != null) {
            return mapToResponseDTO(user);
        }
        return null;
    }

    @Override
    public UserResponseDTO getUserProfile(String userId) {
        Optional<Users> user = usersRepository.findById(userId);
        return user.map(this::mapToResponseDTO).orElse(null);
    }

    @Override
    public UserResponseDTO updateUserProfile(Users user) {
        Optional<Users> existingUser = usersRepository.findById(user.getUser_id());
        if (existingUser.isPresent()) {
            Users updatedUser = existingUser.get();
            updatedUser.setUsername(user.getUsername());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhone(user.getPhone());
            updatedUser.setAddress(user.getAddress());
            updatedUser.setCity(user.getCity());
            updatedUser.setState(user.getState());
            updatedUser.setPostalCode(user.getPostalCode());
            updatedUser.setCountry(user.getCountry());
            updatedUser.setLatitude(user.getLatitude());
            updatedUser.setLongitude(user.getLongitude());
            updatedUser.setUpdated_at(LocalDateTime.now());
            Users savedUser = usersRepository.save(updatedUser);
            return mapToResponseDTO(savedUser);
        }
        return null;
    }
}
