package com.klef.sdp.backendproject.service;

import com.klef.sdp.backendproject.dto.DonationRequestDTO;
import com.klef.sdp.backendproject.dto.DonationResponseDTO;
import com.klef.sdp.backendproject.model.Donations;
import com.klef.sdp.backendproject.dto.MatchedBeneficiaryDTO;
import com.klef.sdp.backendproject.model.Users;
import com.klef.sdp.backendproject.repository.DonationsRepository;
import com.klef.sdp.backendproject.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DonorServiceImpl implements DonorService {
    @Autowired
    private DonationsRepository donationsRepository;

    @Autowired
    private UsersRepository usersRepository;

    private DonationResponseDTO mapToResponseDTO(Donations donation) {
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

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth's radius in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    @Override
    public DonationResponseDTO createDonation(DonationRequestDTO request) {
        // Validate userId and fetch Users entity
        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            throw new IllegalArgumentException("userId is required");
        }
        Optional<Users> userOptional = usersRepository.findById(request.getUserId());
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found with ID: " + request.getUserId());
        }

        // Map DTO to Donations entity
        Donations donation = new Donations();
        donation.setUser(userOptional.get());
        donation.setDonation_id(UUID.randomUUID().toString());
        donation.setFood_description(request.getFood_description());
        donation.setFood_category(Donations.FoodCategory.valueOf(request.getFood_category()));
        donation.setQuantity_kg(request.getQuantity_kg());
        donation.setExpiry_date(request.getExpiry_date());
        donation.setPickup_window_start(request.getPickup_window_start());
        donation.setPickup_window_end(request.getPickup_window_end());
        donation.setLatitude(request.getLatitude());
        donation.setLongitude(request.getLongitude());
        donation.setStatus(Donations.Status.available);
        donation.setCreated_at(LocalDateTime.now());
        donation.setUpdated_at(LocalDateTime.now());

        Donations savedDonation = donationsRepository.save(donation);
        return mapToResponseDTO(savedDonation);
    }
    @Override
    public DonationResponseDTO updateDonation(Donations donation) {
        Optional<Donations> existingDonation = donationsRepository.findById(donation.getDonation_id());
        if (existingDonation.isPresent()) {
            Donations updatedDonation = existingDonation.get();
            if (!updatedDonation.getUser().getUser_id().equals(donation.getUser().getUser_id())) {
                return null; // Unauthorized
            }
            updatedDonation.setFood_description(donation.getFood_description());
            updatedDonation.setFood_category(donation.getFood_category());
            updatedDonation.setQuantity_kg(donation.getQuantity_kg());
            updatedDonation.setExpiry_date(donation.getExpiry_date());
            updatedDonation.setPickup_window_start(donation.getPickup_window_start());
            updatedDonation.setPickup_window_end(donation.getPickup_window_end());
            updatedDonation.setLatitude(donation.getLatitude());
            updatedDonation.setLongitude(donation.getLongitude());
            updatedDonation.setUpdated_at(LocalDateTime.now());
            Donations savedDonation = donationsRepository.save(updatedDonation);
            return mapToResponseDTO(savedDonation);
        }
        return null;
    }

    @Override
    public String deleteDonation(String donationId, String userId) {
        Optional<Donations> donation = donationsRepository.findById(donationId);
        if (donation.isPresent() && donation.get().getUser().getUser_id().equals(userId)) {
            donationsRepository.deleteById(donationId);
            return "Donation deleted successfully";
        }
        return "Donation ID Not Found or Unauthorized";
    }

    @Override
    public List<DonationResponseDTO> listDonations(String userId, String status) {
        List<Donations> donations;
        if (status != null && !status.isEmpty()) {
            try {
                Donations.Status donationStatus = Donations.Status.valueOf(status);
                donations = donationsRepository.findByUserUserIdAndStatus(userId, donationStatus);
            } catch (IllegalArgumentException e) {
                donations = donationsRepository.findByUserUserId(userId);
            }
        } else {
            donations = donationsRepository.findByUserUserId(userId);
        }
        return donations.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    @Override
    public DonationResponseDTO getDonationDetails(String donationId, String userId) {
        Optional<Donations> donation = donationsRepository.findById(donationId);
        if (donation.isPresent() && donation.get().getUser().getUser_id().equals(userId)) {
            return mapToResponseDTO(donation.get());
        }
        return null;
    }
    @Override
    public List<MatchedBeneficiaryDTO> matchDonation(String donationId, String userId) {
        Optional<Donations> donation = donationsRepository.findById(donationId);
        if (donation.isPresent() && donation.get().getUser().getUser_id().equals(userId)) {
            Double donationLat = donation.get().getLatitude();
            Double donationLon = donation.get().getLongitude();
            List<Users> beneficiaries = donationsRepository.findActiveBeneficiaries();
            List<MatchedBeneficiaryDTO> matches = new ArrayList<>();
            for (Users beneficiary : beneficiaries) {
                if (beneficiary.getLatitude() != null && beneficiary.getLongitude() != null) {
                    double distance = calculateDistance(donationLat, donationLon, beneficiary.getLatitude(), beneficiary.getLongitude());
                    if (distance <= 50) { // Arbitrary threshold of 50km
                        MatchedBeneficiaryDTO dto = new MatchedBeneficiaryDTO();
                        dto.setUserId(beneficiary.getUser_id());
                        dto.setUsername(beneficiary.getUsername());
                        dto.setDistanceKm(distance);
                        matches.add(dto);
                    }
                }
            }
            return matches;
        }
        return new ArrayList<>();
    }

    @Override
    public DonationResponseDTO updateDonationStatus(String donationId, String userId, String status) {
        Optional<Donations> existingDonation = donationsRepository.findById(donationId);
        if (existingDonation.isPresent() && existingDonation.get().getUser().getUser_id().equals(userId)) {
            Donations donation = existingDonation.get();
            try {
                Donations.Status newStatus = Donations.Status.valueOf(status);
                donation.setStatus(newStatus);
                donation.setUpdated_at(LocalDateTime.now());
                Donations savedDonation = donationsRepository.save(donation);
                return mapToResponseDTO(savedDonation);
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
        return null;
    }
}