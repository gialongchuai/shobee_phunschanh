package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_group")
@Entity(name = "Group")
public class Group extends AbstractEntity<Integer> {

    @Column(name = "name")
    private String name;

//    @Column(name = "description")
//    private String description;

    @OneToOne
    private Role role;

    @OneToMany(mappedBy = "group")
    private List<GroupHasUser> groupHasUsers = new ArrayList<>();
}
