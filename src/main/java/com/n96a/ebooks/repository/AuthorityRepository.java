package com.n96a.ebooks.repository;

import com.n96a.ebooks.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    public Authority getByName(String name);
}
