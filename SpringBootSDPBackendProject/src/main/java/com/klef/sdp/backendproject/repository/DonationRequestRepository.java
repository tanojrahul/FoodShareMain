package com.klef.sdp.backendproject.repository;

import com.klef.sdp.backendproject.model.DonationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRequestRepository extends JpaRepository<DonationRequest, String> {
    @Query("SELECT dr FROM DonationRequest dr WHERE dr.beneficiary.user_id = ?1")
    List<DonationRequest> findByBeneficiaryUserId(String userId);

    @Query("SELECT dr FROM DonationRequest dr WHERE dr.beneficiary.user_id = ?1 AND dr.status = ?2")
    List<DonationRequest> findByBeneficiaryUserIdAndStatus(String userId, DonationRequest.Status status);
}