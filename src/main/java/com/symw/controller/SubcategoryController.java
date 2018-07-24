package com.symw.controller;

import com.symw.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;

    @PostMapping("/api/createSubcategory")
    @ResponseBody
    public Boolean createCategory(
            @RequestParam("selectedCategory") String category_name,
            @RequestParam("subcategory") String subcategory,
            @RequestParam("year") int year,
            @RequestParam("month") int month) {

        return subcategoryService.addSubcategory(category_name, subcategory, year, month);
    }

}
