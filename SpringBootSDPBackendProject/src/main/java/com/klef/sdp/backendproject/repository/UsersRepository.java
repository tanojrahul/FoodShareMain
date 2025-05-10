package com.klef.sdp.backendproject.repository;

import com.klef.sdp.backendproject.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
    @Query("SELECT u FROM Users u WHERE u.email = ?1 AND u.password_hash = ?2")
    Users findByEmailAndPassword(String email, String password);

	Users findByEmail(String email);
}
