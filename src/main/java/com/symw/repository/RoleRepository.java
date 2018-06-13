package com.symw.repository;

import com.symw.entity.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Integer> {

    Optional<Role> findById(Long id);
    Optional<Role> findByName(String name);
}
