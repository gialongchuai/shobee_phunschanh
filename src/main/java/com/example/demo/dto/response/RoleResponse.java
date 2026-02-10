package com.example.demo.dto.response;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponse extends AbstractEntityResponse<Integer> {

    private String name;

    private Set<RoleHasPermissionResponse> roleHasPermissionResponses = new HashSet<>();

    private Set<UserHasRoleResponse> userHasRoleResponses = new HashSet<>();

    private Set<GroupResponse> groupResponses = new HashSet<>();
}
