package com.klef.sdp.backendproject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
public class Donations {
    @Id
    @Column(length = 36)
    private String donation_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String food_description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory food_category;

    @Column(nullable = false)
    private Double quantity_kg;

    @Column(nullable = false)
    private LocalDateTime expiry_date;

    @Column(nullable = false)
    private LocalDateTime pickup_window_start;

    @Column(nullable = false)
    private LocalDateTime pickup_window_end;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private LocalDateTime created_at;

    @Column(nullable = false)
    private LocalDateTime updated_at;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    // Enum for food_category
    public enum FoodCategory {
        perishable, non_perishable, prepared
    }

    // Enum for status
    public enum Status {
        available, requested, in_transit, delivered, expired, rejected
    }

    // Getters and Setters
    public String getDonation_id() {
        return donation_id;
    }

    public void setDonation_id(String donation_id) {
        this.donation_id = donation_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getFood_description() {
        return food_description;
    }

    public void setFood_description(String food_description) {
        this.food_description = food_description;
    }

    public FoodCategory getFood_category() {
        return food_category;
    }

    public void setFood_category(FoodCategory food_category) {
        this.food_category = food_category;
    }

    public Double getQuantity_kg() {
        return quantity_kg;
    }

    public void setQuantity_kg(Double quantity_kg) {
        this.quantity_kg = quantity_kg;
    }

    public LocalDateTime getExpiry_date() {
        return expiry_date;
    }

    public void setExpiry_date(LocalDateTime expiry_date) {
        this.expiry_date = expiry_date;
    }

    public LocalDateTime getPickup_window_start() {
        return pickup_window_start;
    }

    public void setPickup_window_start(LocalDateTime pickup_window_start) {
        this.pickup_window_start = pickup_window_start;
    }

    public LocalDateTime getPickup_window_end() {
        return pickup_window_end;
    }

    public void setPickup_window_end(LocalDateTime pickup_window_end) {
        this.pickup_window_end = pickup_window_end;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
