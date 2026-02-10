package com.example.demo.mapper;

import com.example.demo.dto.request.AddressRequestDTO;
import com.example.demo.dto.response.AddressResponse;
import com.example.demo.model.Address;

public class AddressMapper {
    public static AddressResponse toAddressResponse(Address address) {
        AddressResponse addressResponse = AddressResponse.builder()
                .apartmentNumber(address.getApartmentNumber())
                .floor(address.getFloor())
                .building(address.getBuilding())
                .streetNumber(address.getStreetNumber())
                .street(address.getStreet())
                .city(address.getCity())
                .country(address.getCountry())
                .addressType(address.getAddressType())
                .build();

        addressResponse.setId(address.getId());
        addressResponse.setCreatedAt(address.getCreatedAt());
        addressResponse.setUpdatedAt(address.getUpdatedAt());
        return addressResponse;
    }

    public static Address toAddress(AddressRequestDTO addressRequestDTO) {
        Address address = Address.builder()
                .apartmentNumber(addressRequestDTO.getApartmentNumber())
                .floor(addressRequestDTO.getFloor())
                .building(addressRequestDTO.getBuilding())
                .streetNumber(addressRequestDTO.getStreetNumber())
                .street(addressRequestDTO.getStreet())
                .city(addressRequestDTO.getCity())
                .country(addressRequestDTO.getCountry())
                .addressType(addressRequestDTO.getAddressType())
                .build();

        return address;
    }

    public static void updateAddress(Address address, AddressRequestDTO addressRequestDTO) {
        address.setApartmentNumber(addressRequestDTO.getApartmentNumber());
        address.setFloor(addressRequestDTO.getFloor());
        address.setBuilding(addressRequestDTO.getBuilding());
        address.setStreetNumber(addressRequestDTO.getStreetNumber());
        address.setStreet(addressRequestDTO.getStreet());
        address.setCity(addressRequestDTO.getCity());
        address.setCountry(addressRequestDTO.getCountry());
        address.setAddressType(addressRequestDTO.getAddressType());
    }
}
