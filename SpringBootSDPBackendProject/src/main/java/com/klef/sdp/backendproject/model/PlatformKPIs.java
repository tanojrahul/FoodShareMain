package com.klef.sdp.backendproject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "platform_kpis")
public class PlatformKPIs {
    @Id
    @Column(length = 36)
    private String kpi_id;

    @Column
    private Double total_food_saved_kg;

    @Column
    private Integer total_donations;

    @Column
    private Integer total_meals_served;

    @Column
    private Integer total_beneficiaries;

    @Column
    private Double total_carbon_offset_kg;

    @Column(nullable = false)
    private LocalDateTime updated_at;

    // Getters and Setters
    public String getKpi_id() {
        return kpi_id;
    }

    public void setKpi_id(String kpi_id) {
        this.kpi_id = kpi_id;
    }

    public Double getTotal_food_saved_kg() {
        return total_food_saved_kg;
    }

    public void setTotal_food_saved_kg(Double total_food_saved_kg) {
        this.total_food_saved_kg = total_food_saved_kg;
    }

    public Integer getTotal_donations() {
        return total_donations;
    }

    public void setTotal_donations(Integer total_donations) {
        this.total_donations = total_donations;
    }

    public Integer getTotal_meals_served() {
        return total_meals_served;
    }

    public void setTotal_meals_served(Integer total_meals_served) {
        this.total_meals_served = total_meals_served;
    }

    public Integer getTotal_beneficiaries() {
        return total_beneficiaries;
    }

    public void setTotal_beneficiaries(Integer total_beneficiaries) {
        this.total_beneficiaries = total_beneficiaries;
    }

    public Double getTotal_carbon_offset_kg() {
        return total_carbon_offset_kg;
    }

    public void setTotal_carbon_offset_kg(Double total_carbon_offset_kg) {
        this.total_carbon_offset_kg = total_carbon_offset_kg;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}
