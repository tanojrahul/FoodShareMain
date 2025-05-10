package com.klef.sdp.backendproject.dto;

import java.util.List;

public class AnalyticsReportResponseDTO {
    private long totalDonations;
    private double totalFoodSavedKg;
    private long totalMealsServed;
    private List<TopDonorDTO> topDonors;
    private List<GeographicImpactDTO> geographicImpact;

    public static class TopDonorDTO {
        private String userId;
        private String username;
        private long totalDonations;

        // Getters and Setters
        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public long getTotalDonations() {
            return totalDonations;
        }

        public void setTotalDonations(long totalDonations) {
            this.totalDonations = totalDonations;
        }
    }

    public static class GeographicImpactDTO {
        private String city;
        private double foodSavedKg;

        // Getters and Setters
        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public double getFoodSavedKg() {
            return foodSavedKg;
        }

        public void setFoodSavedKg(double foodSavedKg) {
            this.foodSavedKg = foodSavedKg;
        }
    }

    // Getters and Setters
    public long getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(long totalDonations) {
        this.totalDonations = totalDonations;
    }

    public double getTotalFoodSavedKg() {
        return totalFoodSavedKg;
    }

    public void setTotalFoodSavedKg(double totalFoodSavedKg) {
        this.totalFoodSavedKg = totalFoodSavedKg;
    }

    public long getTotalMealsServed() {
        return totalMealsServed;
    }

    public void setTotalMealsServed(long totalMealsServed) {
        this.totalMealsServed = totalMealsServed;
    }

    public List<TopDonorDTO> getTopDonors() {
        return topDonors;
    }

    public void setTopDonors(List<TopDonorDTO> topDonors) {
        this.topDonors = topDonors;
    }

    public List<GeographicImpactDTO> getGeographicImpact() {
        return geographicImpact;
    }

    public void setGeographicImpact(List<GeographicImpactDTO> geographicImpact) {
        this.geographicImpact = geographicImpact;
    }
}