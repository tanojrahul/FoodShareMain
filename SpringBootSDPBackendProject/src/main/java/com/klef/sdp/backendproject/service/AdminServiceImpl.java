package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.*;
import com.klef.sdp.backendproject.model.Donations;
import com.klef.sdp.backendproject.model.Users;
import com.klef.sdp.backendproject.repository.DonationsRepository;
import com.klef.sdp.backendproject.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private DonationsRepository donationsRepository;

    private void validateAdmin(String adminUserId) {
        Optional<Users> adminOptional = usersRepository.findById(adminUserId);
        if (!adminOptional.isPresent() || !"admin".equals(adminOptional.get().getRole())) {
            throw new IllegalArgumentException("User is not an admin");
        }
    }

    private UserResponseDTO mapToUserResponseDTO(Users user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setUserId(user.getUser_id());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setIsActive(user.isIs_active());
        return dto;
    }

    private UserDetailsResponseDTO mapToUserDetailsResponseDTO(Users user) {
        UserDetailsResponseDTO dto = new UserDetailsResponseDTO();
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
        dto.setActive(user.isIs_active());
        return dto;
    }

    private DonationResponseDTO mapToDonationResponseDTO(Donations donation) {
        DonationResponseDTO dto = new DonationResponseDTO();
        dto.setDonationId(donation.getDonation_id());
        dto.setUserId(donation.getUser().getUser_id());
        dto.setFoodDescription(donation.getFood_description());
        dto.setFoodCategory(donation.getFood_category().name());
        dto.setQuantityKg(donation.getQuantity_kg());
        dto.setExpiryDate(donation.getExpiry_date());
        dto.setPickupWindowStart(donation.getPickup_window_start());
        dto.setPickupWindowEnd(donation.getPickup_window_end());
        dto.setStatus(donation.getStatus().name());
        dto.setLatitude(donation.getLatitude());
        dto.setLongitude(donation.getLongitude());
        dto.setCreatedAt(donation.getCreated_at());
        return dto;
    }

    @Override
    public List<UserResponseDTO> listAllUsers(String adminUserId) {
        validateAdmin(adminUserId);
        List<Users> users = usersRepository.findAll();
        return users.stream().map(this::mapToUserResponseDTO).collect(Collectors.toList());
    }

    @Override
    public UserDetailsResponseDTO getUserDetails(String targetUserId, String adminUserId) {
        validateAdmin(adminUserId);
        Optional<Users> userOptional = usersRepository.findById(targetUserId);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + targetUserId);
        }
        return mapToUserDetailsResponseDTO(userOptional.get());
    }
    @Override
    public UserResponseDTO updateUserStatus(String targetUserId, UpdateUserStatusRequestDTO request) {
        validateAdmin(request.getUserId());
        Optional<Users> userOptional = usersRepository.findById(targetUserId);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + targetUserId);
        }
        Users user = userOptional.get();
        user.setIs_active(request.isActive());
        Users updatedUser = usersRepository.save(user);
        return mapToUserResponseDTO(updatedUser);
    }

    @Override
    public List<DonationResponseDTO> listAllDonations(String adminUserId) {
        validateAdmin(adminUserId);
        List<Donations> donations = donationsRepository.findAll();
        return donations.stream().map(this::mapToDonationResponseDTO).collect(Collectors.toList());
    }

    @Override
    public DonationResponseDTO overrideDonationStatus(String donationId, UpdateDonationStatusRequestDTO request) {
        validateAdmin(request.getUserId());
        Optional<Donations> donationOptional = donationsRepository.findById(donationId);
        if (!donationOptional.isPresent()) {
            throw new IllegalArgumentException("Donation not found with ID: " + donationId);
        }
        Donations donation = donationOptional.get();
        try {
            Donations.Status newStatus = Donations.Status.valueOf(request.getStatus());
            donation.setStatus(newStatus);
            donation.setUpdated_at(LocalDateTime.now());
            Donations updatedDonation = donationsRepository.save(donation);
            return mapToDonationResponseDTO(updatedDonation);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + request.getStatus());
        }
    }

    @Override
    public AnalyticsReportResponseDTO generateAnalyticsReport(String adminUserId) {
        validateAdmin(adminUserId);
        List<Donations> donations = donationsRepository.findAll();

        AnalyticsReportResponseDTO report = new AnalyticsReportResponseDTO();
        report.setTotalDonations(donations.size());

        double totalFoodSavedKg = donations.stream()
                .filter(d -> d.getStatus() == Donations.Status.delivered)
                .mapToDouble(Donations::getQuantity_kg)
                .sum();
        report.setTotalFoodSavedKg(totalFoodSavedKg);

        // Assume 1 kg = 2 meals
        long totalMealsServed = (long) (totalFoodSavedKg * 2);
        report.setTotalMealsServed(totalMealsServed);

        // Top donors: Group by user, count donations, limit to top 5
        Map<String, Long> donationCounts = donations.stream()
                .collect(Collectors.groupingBy(d -> d.getUser().getUser_id(), Collectors.counting()));
        List<AnalyticsReportResponseDTO.TopDonorDTO> topDonors = donationCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> {
                    Optional<Users> user = usersRepository.findById(entry.getKey());
                    AnalyticsReportResponseDTO.TopDonorDTO dto = new AnalyticsReportResponseDTO.TopDonorDTO();
                    dto.setUserId(entry.getKey());
                    dto.setUsername(user.map(Users::getUsername).orElse("Unknown"));
                    dto.setTotalDonations(entry.getValue());
                    return dto;
                })
                .collect(Collectors.toList());
        report.setTopDonors(topDonors);
     // Geographic impact: Group by city, sum food saved
        Map<String, Double> foodByCity = donations.stream()
                .filter(d -> d.getStatus() == Donations.Status.delivered)
                .filter(d -> d.getUser().getCity() != null)
                .collect(Collectors.groupingBy(
                        d -> d.getUser().getCity(),
                        Collectors.summingDouble(Donations::getQuantity_kg)
                ));
        List<AnalyticsReportResponseDTO.GeographicImpactDTO> geographicImpact = foodByCity.entrySet().stream()
                .map(entry -> {
                    AnalyticsReportResponseDTO.GeographicImpactDTO dto = new AnalyticsReportResponseDTO.GeographicImpactDTO();
                    dto.setCity(entry.getKey());
                    dto.setFoodSavedKg(entry.getValue());
                    return dto;
                })
                .collect(Collectors.toList());
        report.setGeographicImpact(geographicImpact);

        return report;
    }

    @Override
    public AuditDonationResponseDTO auditDonation(String donationId, AuditDonationRequestDTO request) {
        validateAdmin(request.getUserId());
        Optional<Donations> donationOptional = donationsRepository.findById(donationId);
        if (!donationOptional.isPresent()) {
            throw new IllegalArgumentException("Donation not found with ID: " + donationId);
        }
        Donations donation = donationOptional.get();
        String action = request.getAction().toLowerCase();
        if ("approve".equals(action)) {
            donation.setStatus(Donations.Status.available);
        } else if ("reject".equals(action)) {
            donation.setStatus(Donations.Status.rejected);
        } else {
            throw new IllegalArgumentException("Invalid action: " + request.getAction());
        }
        donation.setUpdated_at(LocalDateTime.now());
        Donations updatedDonation = donationsRepository.save(donation);

        AuditDonationResponseDTO response = new AuditDonationResponseDTO();
        response.setDonationId(donationId);
        response.setStatus(updatedDonation.getStatus().name());
        return response;
    }
}