package com.n96a.ebooks.service;

import java.util.List;

import com.n96a.ebooks.model.Category;

public interface CategoryServiceInterface {

    Category findOne(Integer id);

    Category create(Category category);

    Category update(Category category);

    Category partialUpdate(Category category);

    void remove(Integer id);

    List<Category> findAll();

}
