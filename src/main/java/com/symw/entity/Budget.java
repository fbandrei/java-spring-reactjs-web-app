package com.symw.entity;

import javax.persistence.*;
import java.time.Year;

@Entity
@Table(name = "budget")
public class Budget {

    @Id
    @GeneratedValue
    @Column(name="budgetId")
    private Long budgetId;

    @Column(name="year")
    private Year year;

    @Column(name="month")
    private int month; // 1-January .. 12-December

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @Column(name="budget")
    private Double budget;

    @Column(name="activity")
    private Double activity;

    @Column(name="available")
    private Double availableAmount;

    public Long getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Double getActivity() {
        return activity;
    }

    public void setActivity(Double activity) {
        this.activity = activity;
    }

    public Double getAvailableAmount() {
        return availableAmount;
    }

    public void setAvailableAmount(Double availableAmount) {
        this.availableAmount = availableAmount;
    }
}
