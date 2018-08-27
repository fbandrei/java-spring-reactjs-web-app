package com.symw.repository;

import com.symw.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findById(Long id);
    Optional<Role> findByName(String name);
}
