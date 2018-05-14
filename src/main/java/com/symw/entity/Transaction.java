package com.symw.entity;

import javax.persistence.*;

@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="transaction_id")
	private int transactionId;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "sum_in")
	private double sumIn;
	
	@Column(name = "sum_out")
	private double sumOut;
	
	@ManyToOne
	@JoinColumn(name = "account_number", referencedColumnName = "account_number")
	private Account account;
	
	@ManyToOne
	@JoinColumn(name = "payee_id", referencedColumnName = "payee_id")
	private Payee payee;
	
	@ManyToOne
	@JoinColumn(name = "subcategory_id", referencedColumnName = "subcategory_id")
	private Subcategory subcategory;

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getSumIn() {
		return sumIn;
	}

	public void setSumIn(double sumIn) {
		this.sumIn = sumIn;
	}

	public double getSumOut() {
		return sumOut;
	}

	public void setSumOut(double sumOut) {
		this.sumOut = sumOut;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Payee getPayee() {
		return payee;
	}

	public void setPayee(Payee payee) {
		this.payee = payee;
	}

	public Subcategory getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(Subcategory subcategory) {
		this.subcategory = subcategory;
	}
	
}
