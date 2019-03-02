package com.symw.service;

import com.symw.entity.*;
import com.symw.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GlobalRepository globalRepository;

    public Set<Category> getBudgetCategories(short year, short month) {
        User user = userService.getAuthenticatedUser();
        Iterable<Category> allCategories = categoryRepository.findAllByUserId(user.getId());
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

    public void updateBudget(Subcategory subcategory) {

        Iterable<Budget> budgets = budgetRepository.findBySubcategory(subcategory);
        Budget budget = subcategory.getBudgets().stream().findFirst().get();
        LOGGER.info(budget.getYear() + " < parameter > " + budget.getMonth() + "| " + budget.getAvailableAmount());
        for(Budget b: budgets) {
            if (b.getYear() == budget.getYear() && b.getMonth() == budget.getMonth()) {
                b.setBudget(budget.getBudget());

            }
            b.setAvailableAmount(budget.getAvailableAmount());
            LOGGER.info(b.getYear() + " " + b.getMonth());
        }

        budgetRepository.saveAll(budgets);

    }

    public void updateToBeBudget(double toBeBudget) {
        User authenticatedUser = userService.getAuthenticatedUser();
        User user = userRepository.findById(authenticatedUser.getId()).get();
        Global global = globalRepository.findByUser(user).get();
        global.setBudget(toBeBudget);
        globalRepository.save(global);
    }
}
