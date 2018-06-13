package com.symw.controller;

import com.symw.entity.Account;
import com.symw.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@Controller
public class AccountController {

    @Autowired
    private AccountService accountService;

    private static final Logger LOGGER = Logger.getLogger(AccountController.class.getName());

    @RequestMapping(value = "/getAccounts", method = RequestMethod.GET)
    @CrossOrigin
    @ResponseBody
    public Iterable<Account> getAccounts() {

        return accountService.getAllAccounts();
    }

    @RequestMapping(value = "/createAccount", method = RequestMethod.POST)
    @CrossOrigin
    @ResponseBody
    public String createAccount(@RequestBody Account account) {

        if (accountService.createAccount(account)) {
            return "OK";
        } else {
            return "NOK";
        }
    }
}
