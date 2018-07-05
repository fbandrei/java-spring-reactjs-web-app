package com.symw.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
public class Subcategory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="subcategory_id")
	private Long subcategoryId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "sum")
	private double sum;

	@OneToOne(mappedBy = "subcategory")
	private Budget budget;

	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "category_id")
	private Category category;
	
	@OneToMany(mappedBy="subcategory", fetch = FetchType.EAGER)
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

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
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

	public Budget getBudget() {
		return budget;
	}

	public void setBudget(Budget budget) {
		this.budget = budget;
	}
}
