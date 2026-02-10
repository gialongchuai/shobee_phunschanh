package com.example.demo.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupHasUserResponse extends AbstractEntityResponse<Long> {

    private UserResponse userResponse;

    private GroupResponse groupResponse;
}
