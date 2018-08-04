package com.symw.controller;

import com.symw.entity.Category;
import com.symw.entity.Subcategory;
import com.symw.payloads.ApiResponse;
import com.symw.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/api/deleteSubcategory")
    @CrossOrigin
    public ResponseEntity deleteSubcategory(@RequestBody Subcategory subcategory) {

        if (subcategoryService.deleteSubcategory(subcategory)) {
            return ResponseEntity.ok(new ApiResponse(true, "subcategory deleted"));
        } else {
            return ResponseEntity.ok(new ApiResponse(false, "something went wrong"));
        }
    }

}
