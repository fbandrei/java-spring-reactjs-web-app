package com.symw.repository;

import com.symw.entity.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long>{

    @Override
    Optional<Category> findById(Long aLong);

    Optional<Category> findByName(String name);
}
