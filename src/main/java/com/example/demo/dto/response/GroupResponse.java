package com.example.demo.dto.response;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupResponse extends AbstractEntityResponse<Integer> {

    private String name;

    private RoleResponse roleResponse;

    private Set<GroupHasUserResponse> groupHasUserResponses = new HashSet<>();
}
