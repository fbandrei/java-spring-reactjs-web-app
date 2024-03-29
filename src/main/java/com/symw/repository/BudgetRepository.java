package com.symw.repository;

import com.symw.entity.Budget;
import com.symw.entity.Subcategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface BudgetRepository extends CrudRepository<Budget, Long> {

    @Override
    Optional<Budget> findById(Long aLong);

    Optional<Budget> findByYearAndMonthAndSubcategory(short year, short month, Subcategory subcategory);

    Iterable<Budget> findBySubcategory(Subcategory s);
    }
