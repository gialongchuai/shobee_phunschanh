package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressCreationRequest {

    private String apartmentNumber;

    private String floor;

    private String building;

    private String streetNumber;

    private String street;

    private String city;

    private String country;

    private String addressType; // gán kiểu wrapper ko truyền là null kẻo int = 0

}