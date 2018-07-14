package com.symw.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Subcategory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="subcategory_id")
	private Long subcategoryId;
	
	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "subcategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Budget> budgets = new HashSet<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id", referencedColumnName = "category_id")
	@JsonBackReference(value = "categoryReference")
	private Category category;
	
	@OneToMany(mappedBy="subcategory", fetch = FetchType.LAZY)
	@JsonBackReference(value = "transactionsReference")
	private Set<Transaction> transactions = new HashSet<>();

	public Long getSubcategoryId() {
		return subcategoryId;
	}

	public void setSubcategoryId(Long subcategoryId) {
		this.subcategoryId = subcategoryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(Set<Transaction> transactions) {
		this.transactions = transactions;
	}

	public Set<Budget> getBudgets() {
		return budgets;
	}

	public void setBudgets(Set<Budget> budgets) {
		this.budgets = budgets;
	}
}
