package com.symw.controller;

import com.symw.entity.Budget;
import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import com.symw.payloads.ApiResponse;
import com.symw.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Controller
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping("/api/budget/getBudgetData")
    @ResponseBody
    public Set<Category> getBudget(@RequestParam("year") short year,
                                   @RequestParam("month") short month) {

        return budgetService.getBudgetCategories(year, month);
    }

    @PutMapping("/api/updateBudget")
    @CrossOrigin
    @ResponseBody
    public ResponseEntity updateBudgetSubcategory(@RequestBody Subcategory subcategory) {

        budgetService.updateBudget(subcategory);
        return ResponseEntity.ok(new ApiResponse(true, "Budget of subcategory updated"));
    }

    @PutMapping("/api/updateToBeBudget")
    public ResponseEntity updateToBeBudget(@RequestParam("toBeBudget") double toBeBudget) {

        budgetService.updateToBeBudget(toBeBudget);
        return ResponseEntity.ok(new ApiResponse(true, "To be budget updated"));
    }





}
