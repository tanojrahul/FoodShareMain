
package com.klef.sdp.backendproject.dto;

public class ImpactMetricsResponseDTO {
    private String userId;
    private double foodSavedKg;
    private long mealsServed;
    private double carbonOffsetKg;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getFoodSavedKg() {
        return foodSavedKg;
    }

    public void setFoodSavedKg(double foodSavedKg) {
        this.foodSavedKg = foodSavedKg;
    }

    public long getMealsServed() {
        return mealsServed;
    }

    public void setMealsServed(long mealsServed) {
        this.mealsServed = mealsServed;
    }

    public double getCarbonOffsetKg() {
        return carbonOffsetKg;
    }

    public void setCarbonOffsetKg(double carbonOffsetKg) {
        this.carbonOffsetKg = carbonOffsetKg;
    }
}
