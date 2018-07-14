package com.symw.service;

import com.symw.entity.Budget;
import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import com.symw.entity.User;
import com.symw.repository.CategoryRepository;
import com.symw.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Boolean addCategory(String categoryName, String subcategory_1,
                            String subcategory_2, String subcategory_3,
                            short year, short month) {

        Boolean response = true;

        Optional<Category> optionalCategory = categoryRepository.findByName(categoryName);
        if (optionalCategory.isPresent()) {
            response = false;
        } else {
            Category category = new Category();
            category.setName(categoryName);
            category.setUser(userService.getAuthenticatedUser());
            User authenticatedUser = userService.getAuthenticatedUser();
            category.setUser(userRepository.findById(authenticatedUser.getId()).get());
            Set<Subcategory> subcategories = new HashSet<>();
            if (!subcategory_1.isEmpty()) {
                subcategories.add(createSubcategoryAndBudgets(subcategory_1, authenticatedUser, category, year, month));
            }
            if (!subcategory_2.isEmpty()) {
                subcategories.add(createSubcategoryAndBudgets(subcategory_2, authenticatedUser, category, year, month));
            }
            if (!subcategory_3.isEmpty()) {
                subcategories.add(createSubcategoryAndBudgets(subcategory_3, authenticatedUser, category, year, month));
            }
            category.setSubcategories(subcategories);

            categoryRepository.save(category);
        }

        return response;
    }

    private Subcategory createSubcategoryAndBudgets(String subcategoryName, User authenticatedUser,
                                                    Category category, short year, short month) {

        LocalDate joiningDate = authenticatedUser.getJoiningDate();
        Subcategory subcategory = new Subcategory();
        subcategory.setCategory(category);
        subcategory.setName(subcategoryName);
        Set<Budget> budgets = new HashSet<>();
        Budget budget = new Budget();
        budget.setActivity(0.0);
        budget.setAvailableAmount(0.0);
        budget.setBudget(0.0);
        budget.setYear(year);
        budget.setMonth(month);
        budget.setSubcategory(subcategory);
        budgets.add(budget);
        subcategory.setBudgets(budgets);
        return subcategory;
    }
}
