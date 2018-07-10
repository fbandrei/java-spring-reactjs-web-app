package com.symw.repository;

import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface SubcategoryRepository extends CrudRepository<Subcategory, Long> {

    Set<Subcategory> findAllByCategory(Category category);
}
