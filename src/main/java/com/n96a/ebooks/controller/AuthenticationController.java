package com.n96a.ebooks.controller;

import com.n96a.ebooks.DTO.UserDTO;
import com.n96a.ebooks.model.User;
import com.n96a.ebooks.model.UserTokenState;
import com.n96a.ebooks.security.TokenHelper;
import com.n96a.ebooks.security.auth.JwtAuthenticationRequest;
import com.n96a.ebooks.service.CustomUserDetailsService;
import com.n96a.ebooks.service.UserService;
import com.n96a.ebooks.service.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    private TokenHelper tokenHelper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserServiceInterface userService;

    @CrossOrigin()
    @PostMapping(value = "/login")
    public ResponseEntity<UserDTO> createAuthenticationToken(
            @RequestBody JwtAuthenticationRequest authenticationRequest,
            HttpServletResponse response
    ) throws AuthenticationException, IOException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jws = tokenHelper.generateToken(user.getUsername());
        System.out.println(jws);
        UserDTO userDTO = new UserDTO(user, jws);

        return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refreshAuthenticationToken(
            HttpServletRequest request,
            HttpServletResponse response,
            Principal principal
    ) {
        String authToken = tokenHelper.getToken(request);


        if (authToken != null && principal != null) {

            String refreshedToken = tokenHelper.refreshToken(authToken);
            long expiresIn = tokenHelper.getExpiresIn();

            return ResponseEntity.ok(new UserTokenState(refreshedToken, expiresIn));

        } else {
            UserTokenState userTokenState = new UserTokenState();
            return ResponseEntity.accepted().body(userTokenState);
        }
    }

    static class PasswordChanger {
        public String oldPassword;
        public String newPassword;
    }

    @PostMapping(value = "/change-password")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
        userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }

}
