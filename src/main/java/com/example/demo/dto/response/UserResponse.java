package com.example.demo.dto.response;

import com.example.demo.util.Gender;
import com.example.demo.util.UserStatus;
import com.example.demo.util.UserType;
import lombok.*;

import java.util.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse extends AbstractEntityResponse<String> {
    private String firstName;

    private String lastName;

    private Date dateOfBirth;

    private Gender gender;

    private String phone;

    private String email;

    private String username;

    private String password;

    private UserType type;

    private UserStatus status;

    private List<AddressResponse> addressResponses = new ArrayList<>();

    private Set<GroupHasUserResponse> groupHasUserResponses = new HashSet<>();

    private Set<UserHasRoleResponse> userHasRoleResponses = new HashSet<>();
}
