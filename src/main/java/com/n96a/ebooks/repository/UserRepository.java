package com.n96a.ebooks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.n96a.ebooks.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
