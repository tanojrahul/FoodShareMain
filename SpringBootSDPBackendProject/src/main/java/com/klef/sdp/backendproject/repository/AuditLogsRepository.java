package com.klef.sdp.backendproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.sdp.backendproject.model.AuditLogs;

public interface AuditLogsRepository extends JpaRepository<AuditLogs, Integer>  {

}
