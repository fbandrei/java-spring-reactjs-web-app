package com.symw.controller;

import com.symw.entity.Payee;
import com.symw.entity.User;
import com.symw.repository.PayeeRepository;
import com.symw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PayeeController {

    @Autowired
    PayeeRepository payeeRepository;

    @Autowired
    UserService userService;

    @GetMapping("/api/allPayees")
    @ResponseBody
    public Iterable<Payee> getAllPayees() {

        User aUser = userService.getAuthenticatedUser();
        return payeeRepository.findAllByUserId(aUser.getId());
    }
}
