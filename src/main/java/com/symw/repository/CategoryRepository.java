package com.symw.repository;

import com.symw.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long>{

    @Override
    Optional<Category> findById(Long aLong);

    Optional<Category> findByName(String name);
}
