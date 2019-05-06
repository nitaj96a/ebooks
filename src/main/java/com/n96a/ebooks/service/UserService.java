package com.n96a.ebooks.service;

import java.util.Arrays;
import java.util.List;

import com.n96a.ebooks.model.Authority;
import com.n96a.ebooks.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.n96a.ebooks.model.User;
import com.n96a.ebooks.repository.UserRepository;


@Service
public class UserService implements UserServiceInterface {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findOne(Integer id) {
        return userRepository.getOne(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user) {
        if (user.getType().equals("admin")) {
            user.getAuthorities().add(authorityRepository.getByName("ROLE_ADMIN"));
            user.getAuthorities().add(authorityRepository.getByName("ROLE_USER"));
        } else {
            user.getAuthorities().add(authorityRepository.getByName("ROLE_USER"));
        }
        return userRepository.save(user);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
