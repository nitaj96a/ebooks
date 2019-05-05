package com.n96a.ebooks.service;

import java.util.List;

import com.n96a.ebooks.model.User;

public interface UserServiceInterface {

    User findOne(Integer id);
    User findByUsername(String username);
    List<User> findAll();
    User updateUser(User user);
    User createUser(User user);

}
