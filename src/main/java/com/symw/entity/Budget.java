package com.symw.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "budget")
public class Budget {

    private static final Double ZERO = 0.0;

    @Id
    @GeneratedValue
    @Column(name="budgetId")
    private Long budgetId;

    @Column(name="year")
    private short year;

    @Column(name="month")
    private short month; // 1-January .. 12-December

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "subcategoryReference")
    @JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id")
    private Subcategory subcategory;

    @Column(name="budget")
    private Double budgeted;

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

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
    }

    public short getMonth() {
        return month;
    }

    public void setMonth(short month) {
        this.month = month;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public Double getBudget() {
        return budgeted;
    }

    public void setBudget(Double budget) {
        this.budgeted = budget;
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
