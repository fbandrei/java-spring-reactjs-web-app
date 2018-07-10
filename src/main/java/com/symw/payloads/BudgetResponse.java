package com.symw.payloads;

import com.symw.entity.Category;

import java.util.HashSet;
import java.util.Set;

public class BudgetResponse {

    public BudgetResponse() {}

    private Set<Category> categories = new HashSet<>();

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
