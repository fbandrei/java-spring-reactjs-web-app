package com.symw.repository;

import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface SubcategoryRepository extends CrudRepository<Subcategory, Long> {

    Set<Subcategory> findAllByCategory(Category category);

    Subcategory findBySubcategoryId(Long id);
}
