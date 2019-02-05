package com.n96a.ebooks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.n96a.ebooks.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
