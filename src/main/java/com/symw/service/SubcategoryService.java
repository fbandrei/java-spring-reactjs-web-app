package com.symw.service;

import com.symw.entity.Budget;
import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import com.symw.entity.User;
import com.symw.repository.CategoryRepository;
import com.symw.repository.SubcategoryRepository;
import com.symw.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class SubcategoryService {

    @Autowired
    private SubcategoryRepository subcategoryRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryService categoryService;



    public Boolean addSubcategory(String selectedCategory, String subcategory,
                                  int year, int month) {

        User user = userService.getAuthenticatedUser();
        Optional<Category> oCategory = categoryRepository.findByNameAndUserId(selectedCategory, user.getId());
        if (oCategory.isPresent()) {
            Set<Subcategory> subcategories = subcategoryRepository.findAllByCategory(oCategory.get());
            for(Subcategory s: subcategories) {
                if (s.getName().equals(subcategory)) {
                    return false;
                }
            }
            Subcategory newSubcategory = createSubcategoryAndBudgets(oCategory.get(), subcategory, year, month);
            subcategoryRepository.save(newSubcategory);
            return true;
        } else {
            return false;
        }
    }

    private Subcategory createSubcategoryAndBudgets(Category category, String subcategory, int year, int month) {

        Subcategory newSubcategory = new Subcategory();
        newSubcategory.setName(subcategory);
        newSubcategory.setCategory(category);
        newSubcategory.setBudgets(createBudgets(newSubcategory, year, month));
        return newSubcategory;
    }


    private Set<Budget> createBudgets(Subcategory subcategory, int currentYear, int currentMonth) {

        User user = userService.getAuthenticatedUser();
        LocalDate joiningDate = userRepository.findById(user.getId()).get().getJoiningDate();

        return categoryService.createBudgets(joiningDate, currentYear, currentMonth, subcategory);
    }

    public boolean deleteSubcategory(Subcategory subcategory) {

        subcategoryRepository.delete(subcategory);
        return true;
    }
}
