package com.klef.sdp.backendproject.dto;

import java.time.LocalDateTime;

public class DonationRequestDTO {
    private String userId;
    private String food_description;
    private String food_category;
    private Double quantity_kg;
    private LocalDateTime expiry_date;
    private LocalDateTime pickup_window_start;
    private LocalDateTime pickup_window_end;
    private Double latitude;
    private Double longitude;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFood_description() {
        return food_description;
    }

    public void setFood_description(String food_description) {
        this.food_description = food_description;
    }

    public String getFood_category() {
        return food_category;
    }

    public void setFood_category(String food_category) {
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
