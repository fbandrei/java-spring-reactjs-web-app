package com.symw.repository;

import com.symw.entity.Global;
import com.symw.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GlobalRepository extends CrudRepository<Global, Long> {

    @Override
    Optional<Global> findById(Long aLong);

    Optional<Global> findByUser(User user);
}
