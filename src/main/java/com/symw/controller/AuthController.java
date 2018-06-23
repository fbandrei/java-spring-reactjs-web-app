package com.symw.controller;

import com.symw.entity.User;
import com.symw.payloads.ApiResponse;
import com.symw.payloads.JwtAuthenticationResponse;
import com.symw.payloads.LoginRequest;
import com.symw.payloads.SignUpRequest;
import com.symw.repository.UserRepository;
import com.symw.security.JwtTokenProvider;
import com.symw.service.EmailService;
import com.symw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOGGER = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // check if the user is enabled
        Optional<User> oUser = userRepository.findByEmail(loginRequest.getEmail());
        if (oUser.isPresent()) {
            User user = oUser.get();
            if (!user.isEnabled()) {
                LOGGER.info("The user is not enabled.");
                return new ResponseEntity<>(new ApiResponse(false, "Please confirm your registration before signing in."),
                        HttpStatus.OK);
            }
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        LOGGER.info("Email received for login: " + loginRequest.getEmail());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest,
                                          HttpServletRequest httpServletRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "This email address is already registered."),
                    HttpStatus.BAD_REQUEST);
        }

        final String confirmationToken = UUID.randomUUID().toString();
        User result = userService.createUser(signUpRequest.getFirstName(), signUpRequest.getLastName(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), confirmationToken);

        String url = httpServletRequest.getScheme() + "://" + httpServletRequest.getServerName() + ":3000"
                + "/confirm?token=" + confirmationToken;
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setSubject("Confirm your registration");
        simpleMailMessage.setText("In order to activate your account please confirm your registration by" +
                " clicking on the following link:\n\n" + url);
        simpleMailMessage.setFrom("symw.spendyourmoneywisely@gmail.com");
        simpleMailMessage.setTo(signUpRequest.getEmail());
        emailService.sendEmail(simpleMailMessage);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @GetMapping("/confirm")
    public ResponseEntity<?> confirmUser(@RequestParam("token") String token) {

        LOGGER.info("Token: " + token);
        User user = userService.findByConfirmationToken(token);
        if (user != null) {
            user.setEnabled(true);
            user.setConfirmationToken(null);
            userRepository.save(user);
            return ResponseEntity.ok(new ApiResponse(true, "Your account is now activated."));
        } else {
            return ResponseEntity.ok(new ApiResponse(true, "Confirmation link expired."));
        }
    }
}
