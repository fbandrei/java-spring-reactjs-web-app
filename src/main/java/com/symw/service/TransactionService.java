package com.symw.service;

import com.symw.entity.*;
import com.symw.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    UserService userService;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PayeeRepository payeeRepository;

    @Autowired
    SubcategoryRepository subcategoryRepository;

    @Autowired
    AccountRepository accountRepository;

    public Boolean addTransaction(long subcategoryId,
                                  int payeeId,
                                  int year,
                                  int month,
                                  int day,
                                  long accountId,
                                  boolean outcome,
                                  String newPayee,
                                  String description,
                                  double sum) {

        Payee finalPayee = null;
        if (!newPayee.isEmpty()) {
            createNewPayee(newPayee);
        }
        if (payeeId != 0) {
            finalPayee = payeeRepository.findByPayeeId(payeeId);
        } else if (!newPayee.isEmpty()) {
            finalPayee = payeeRepository.findByNameAndUserId(newPayee, userService.getAuthenticatedUser().getId());
        }

        Account account = accountRepository.findByAccountNumber(accountId);
        Subcategory subcategory = subcategoryRepository.findBySubcategoryId(subcategoryId);

        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setDescription(description);
        transaction.setPayee(finalPayee);
        transaction.setSubcategory(subcategory);
        transaction.setSum(sum);
        if (outcome) {
            transaction.setOutcome(1);
        } else {
            transaction.setOutcome(0);
        }
        transaction.setDay(day);
        transaction.setMonth(month);
        transaction.setYear(year);

        transactionRepository.save(transaction);
        return true;
    }

    private void createNewPayee(String newPayee) {

        User aUser = userService.getAuthenticatedUser();
        Optional<User> oUser = userRepository.findById(aUser.getId());
        Payee payee = new Payee();
        payee.setName(newPayee);
        payee.setUser(oUser.get());

        payeeRepository.save(payee);
    }
}
