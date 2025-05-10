package com.klef.sdp.backendproject.model;

     import java.time.LocalDateTime;

import jakarta.persistence.*;

     @Entity
     @Table(name = "users")
     public class Users {
         @Id
         @Column(length = 36)
         private String user_id;

         @Column(nullable = false)
         private String username;

         @Column
         private String email;
         
         @Column(nullable = false)
         private String role;

         @Column
         private String phone;

         @Column(length = 255, nullable = false)
         private String password_hash;

         @Column
         private String address;

         @Column
         private String city;

         @Column
         private String state;

         @Column
         private String postalCode;

         @Column
         private String country;

         @Column
         private Double latitude;

        

		@Column(nullable = true)
         private LocalDateTime created_at;

         @Column(nullable = true)
         private LocalDateTime updated_at;
         
         @Column
         private Double longitude;

         @Column(name = "is_active", nullable = false)
         private boolean is_active;

         // Getters and Setters
         public String getUser_id() {
             return user_id;
         }

         public void setUser_id(String user_id) {
             this.user_id = user_id;
         }

         public String getUsername() {
             return username;
         }

         public void setUsername(String username) {
             this.username = username;
         }

         public String getEmail() {
             return email;
         }

         public void setEmail(String email) {
             this.email = email;
         }

         public String getRole() {
             return role;
         }

         public void setRole(String role) {
             this.role = role;
         }

         public String getPhone() {
             return phone;
         }

         public void setPhone(String phone) {
             this.phone = phone;
         }

         public String getAddress() {
             return address;
         }

         public void setAddress(String address) {
             this.address = address;
         }

         public String getCity() {
             return city;
         }

         public void setCity(String city) {
             this.city = city;
         }

         public String getState() {
             return state;
         }

         public void setState(String state) {
             this.state = state;
         }

         public String getPostalCode() {
             return postalCode;
         }

         public void setPostalCode(String postalCode) {
             this.postalCode = postalCode;
         }

         public String getCountry() {
             return country;
         }

         public void setCountry(String country) {
             this.country = country;
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

         public boolean isIs_active() {
             return is_active;
         }


         public String getPassword_hash() {
             return password_hash;
         }

         public void setPassword_hash(String password_hash) {
             this.password_hash = password_hash;
         }


         public void setIs_active(boolean is_active) {
             this.is_active = is_active;
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

		public Boolean getIs_active() {
			// TODO Auto-generated method stub
			return is_active;
		}

     }