
package com.klef.sdp.backendproject.repository;

import com.klef.sdp.backendproject.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardsRepository extends JpaRepository<Reward, String> {
    @Query("SELECT r FROM Reward r WHERE r.user.user_id = ?1")
    List<Reward> findByUserUserId(String userId);

    @Query("SELECT r.user.user_id, u.username, SUM(r.points) as totalPoints " +
           "FROM Reward r JOIN r.user u " +
           "GROUP BY r.user.user_id, u.username " +
           "ORDER BY SUM(r.points) DESC")
    List<Object[]> findTopUsersByPoints();
}
