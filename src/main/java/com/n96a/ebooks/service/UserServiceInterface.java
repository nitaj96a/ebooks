package com.n96a.ebooks.service;

import java.util.List;

import com.n96a.ebooks.domain.User;

public interface UserServiceInterface {

    User findOne(Integer id);

    List<User> findAll();

}
