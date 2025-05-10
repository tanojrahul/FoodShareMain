package com.klef.sdp.backendproject.repository;

import com.klef.sdp.backendproject.model.Donations;
import com.klef.sdp.backendproject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationsRepository extends JpaRepository<Donations, String> {
    @Query("SELECT d FROM Donations d WHERE d.user.user_id = ?1")
    List<Donations> findByUserUserId(String userId);

    @Query("SELECT d FROM Donations d WHERE d.user.user_id = ?1 AND d.status = ?2")
    List<Donations> findByUserUserIdAndStatus(String userId, Donations.Status status);

    List<Donations> findByStatus(Donations.Status status);

    @Query("SELECT u FROM Users u WHERE u.role = 'beneficiary' AND u.is_active = true")
    List<Users> findActiveBeneficiaries();
}
