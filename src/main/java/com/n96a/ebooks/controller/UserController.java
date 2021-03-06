package com.n96a.ebooks.controller;

import java.security.Principal;
import java.util.List;

import com.n96a.ebooks.model.Ebook;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    //@PreAuthorize("hasRole('ADMIN')")
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

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user, Principal userPrincipal) {
        User currentUser = userService.findByUsername(userPrincipal.getName());

        if (!currentUser.getType().equals("admin"))
            return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);

        User createdUser = userService.createUser(user);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user, Principal userPrincipal) {
        User currentUser = userService.findByUsername(userPrincipal.getName());

        if (!currentUser.getType().equals("admin") && user.getId() != currentUser.getId())
            return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);

        User userFromRepo = userService.findOne(user.getId());
        if (userFromRepo == null)
            return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);

        if (user.getPassword() == null) {
            userFromRepo.setFirstName(user.getFirstName());
            userFromRepo.setLastName(user.getLastName());
            userFromRepo.setType(user.getType());
            userFromRepo.setUsername(user.getUsername());
            userFromRepo = userService.updateUser(userFromRepo);
        } else {
            userFromRepo = userService.updateUser(user);
        }


        return new ResponseEntity<User>(userFromRepo, HttpStatus.OK);
    }

    @PostMapping(value = "/enable/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> userEnabledToggle(@PathVariable("id") Integer id) {
        User user = userService.findOne(id);
        user.setEnabled(!user.isEnabled());
        user = userService.updateUser(user);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
