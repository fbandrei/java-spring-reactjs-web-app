package com.symw.controller;

import com.symw.entity.Category;
import com.symw.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
