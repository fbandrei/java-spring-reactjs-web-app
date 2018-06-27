package com.symw.controller;

import com.symw.entity.Account;
import com.symw.payloads.ApiResponse;
import com.symw.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@Controller
public class AccountController {

    @Autowired
    private AccountService accountService;

    private static final Logger LOGGER = Logger.getLogger(AccountController.class.getName());

    @RequestMapping(value = "/api/getAccounts", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Account> getAccounts() {

        return accountService.getAllAccounts();
    }

    @RequestMapping(value = "/api/createAccount", method = RequestMethod.POST)
    @CrossOrigin
    @ResponseBody
    public ResponseEntity createAccount(@RequestBody Account account) {

        if (accountService.createAccount(account)) {
            return ResponseEntity.ok(new ApiResponse(true, "Account created."));
        } else {
            return ResponseEntity.ok(new ApiResponse(false, "Account already exists."));
        }
    }
}
