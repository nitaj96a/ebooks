package com.n96a.ebooks.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.model.User;
import com.n96a.ebooks.service.UserServiceInterface;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserServiceInterface userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);

    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) {
        User user = userService.findOne(id);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<User> getMe (Principal userPrincipal){
        User user = userService.findByUsername(userPrincipal.getName());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}
