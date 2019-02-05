package com.n96a.ebooks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.n96a.ebooks.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

}
