package com.symw.controller;

import com.symw.entity.Category;
import com.symw.entity.Transaction;
import com.symw.repository.TransactionRepository;
import com.symw.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TransactionController {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionService transactionService;

    @PostMapping("/api/createTransaction")
    @ResponseBody
    public Boolean createTransaction(
            @RequestParam("subcategory") long subcategoryId,
            @RequestParam("payee") int payeeId,
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @RequestParam("day") int day,
            @RequestParam("account") long accountId,
            @RequestParam("outcome") boolean outcome,
            @RequestParam("newPayee") String newPayee,
            @RequestParam("description") String description,
            @RequestParam("sum") double sum) {

        return transactionService.addTransaction(subcategoryId, payeeId, year,
                month, day, accountId, outcome, newPayee, description, sum);
    }

    @GetMapping("/api/getAllTransactions")
    @ResponseBody
    public Iterable<Transaction> getAllTransactions() {

        return transactionRepository.findAll();
    }
}
