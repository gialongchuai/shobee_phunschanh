package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "tbl_permission")
@Entity(name = "Permission")
public class Permission extends AbstractEntity<String> {

    @Column(name = "name")
    private String name;

//    @Column(name = "description")
//    private String description;

    @OneToMany(mappedBy = "permission")
    private List<RoleHasPermission> roleHasPermissions = new ArrayList<>();
}
