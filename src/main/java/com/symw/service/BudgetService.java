package com.symw.service;

import com.symw.entity.Budget;
import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import com.symw.repository.BudgetRepository;
import com.symw.repository.CategoryRepository;
import com.symw.repository.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class BudgetService {

    private static final Logger LOGGER = Logger.getLogger(BudgetService.class.getName());

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SubcategoryRepository subcategoryRepository;
    @Autowired
    private BudgetRepository budgetRepository;

    public Set<Category> getBudgetCategories(short year, short month) {

        Iterable<Category> allCategories = categoryRepository.findAll();
        Set<Category> categories = new HashSet<>();
        for(Category c : allCategories) {
            Set<Subcategory> subcategories = c.getSubcategories();
            for(Subcategory s : subcategories) {
                Optional<Budget> oBudget = budgetRepository.findByYearAndMonthAndSubcategory(year, month, s);
                Set<Budget> budgets = new HashSet<>();
                if (oBudget.isPresent()) {
                    budgets.add(oBudget.get());
                }
                s.setBudgets(budgets);
            }
            Category category = new Category(c.getCategoryId(), c.getName());
            category.setSubcategories(subcategories);
            categories.add(category);
        }

        return categories;
    }
}
