package com.example.demo.repository;

import com.example.demo.model.Role;
import com.example.demo.util.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    @Query(value = "select r from Role r inner join UserHasRole uhr on r.id = uhr.role.id where uhr.user.id = :userId")
    List<Role> getAllByUserId(String userId);

//    Optional<Role> findByType(String roleType);

    Optional<Role> findByName(String roleType);

    Boolean existsByName(String roleName);
}
