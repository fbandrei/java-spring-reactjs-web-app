package com.symw.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
public class Payee {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="payee_id")
	private int payeeId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;

	@JsonBackReference(value = "payeeReference")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;
	
	@OneToMany(mappedBy="payee", fetch = FetchType.LAZY)
	@JsonBackReference(value = "transactionsReference")
	private Set<Transaction> transactions =new HashSet<>();

	public int getPayeeId() {
		return payeeId;
	}

	public void setPayeeId(int payeeId) {
		this.payeeId = payeeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(Set<Transaction> transactions) {
		this.transactions = transactions;
	}
	
}
