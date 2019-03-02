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
import java.util.logging.Logger;

@Service
public class CategoryService {

    private static final Logger LOGGER = Logger.getLogger(CategoryService.class.getName());

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Iterable<Category> getAllCategories() {

        User authenticatedUser = userService.getAuthenticatedUser();
        Iterable<Category> categories = categoryRepository.findAllByUserId(authenticatedUser.getId());
        return categories;
    }

    public Boolean addCategory(String categoryName, String subcategory_1,
                            String subcategory_2, String subcategory_3,
                            int year, int month) {

        Boolean response = true;
        User authenticatedUser = userService.getAuthenticatedUser();
        Optional<Category> optionalCategory = categoryRepository.findByNameAndUserId(categoryName, authenticatedUser.getId());
        if (optionalCategory.isPresent()) {
            response = false;
        } else {
            Category category = new Category();
            category.setName(categoryName);
            category.setUser(userService.getAuthenticatedUser());
            User user = userRepository.findById(authenticatedUser.getId()).get();
            category.setUser(user);
            Set<Subcategory> subcategories = new HashSet<>();
            if (!subcategory_1.isEmpty()) {
                subcategories.add(createSubcategoryAndBudgets(subcategory_1, user, category, year, month));
            }
            if (!subcategory_2.isEmpty()) {
                subcategories.add(createSubcategoryAndBudgets(subcategory_2, user, category, year, month));
            }
            if (!subcategory_3.isEmpty()) {
                subcategories.add(createSubcategoryAndBudgets(subcategory_3, user, category, year, month));
            }
            category.setSubcategories(subcategories);

            categoryRepository.save(category);
        }

        return response;
    }

    private Subcategory createSubcategoryAndBudgets(String subcategoryName, User authenticatedUser,
                                                    Category category, int year, int month) {

        LocalDate joiningDate = authenticatedUser.getJoiningDate();
        Subcategory subcategory = new Subcategory();
        subcategory.setCategory(category);
        subcategory.setName(subcategoryName);
        Set<Budget> budgets = createBudgets(joiningDate, year, month, subcategory);
        subcategory.setBudgets(budgets);
        return subcategory;
    }

    public Set<Budget> createBudgets(LocalDate joiningDate, int currentYear, int currentMonth, Subcategory subcategory) {

        int joiningYear = joiningDate.getYear();
        int joiningMonth = joiningDate.getMonthValue();

        Set<Budget> budgets = new HashSet<>();
        for(int i = joiningYear; i < currentYear; i++) {
            for (int j = joiningMonth; j <= 12; j++) {
                Budget budget = createEmptyBudget(subcategory, i, j);
                budgets.add(budget);
            }
        }
        if (joiningYear == currentYear) {
            for (int i = joiningMonth; i < currentMonth; i++) {
                Budget budget = createEmptyBudget(subcategory, joiningYear, i);
                budgets.add(budget);
            }
        }

        if (currentMonth == 1) {
            for(int i = 1; i <= 12; i++) {
                Budget budget = createEmptyBudget(subcategory, currentYear, i);
                budgets.add(budget);
            }
        } else if (currentMonth > 1) {
            for(int i = currentMonth; i <= 12; i++) {
                Budget budget = createEmptyBudget(subcategory, currentYear, i);
                budgets.add(budget);
            }
            currentYear += 1;
            for(int i = 1; i < currentMonth; i++) {
                Budget budget = createEmptyBudget(subcategory, currentYear, i);
                budgets.add(budget);
            }
        }

        return budgets;
    }

    public Budget createEmptyBudget(Subcategory subcategory, int year, int month) {

        Budget budget = new Budget();
        budget.setSubcategory(subcategory);
        budget.setYear((short) year);
        budget.setMonth((short) month);
        budget.setActivity(0.0);
        budget.setBudget(0.0);
        budget.setAvailableAmount(0.0);

        return budget;
    }

    public boolean deleteCategory(Category category) {

        try {
            categoryRepository.delete(category);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
