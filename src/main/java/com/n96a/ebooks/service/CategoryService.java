package com.n96a.ebooks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.n96a.ebooks.model.Category;
import com.n96a.ebooks.repository.CategoryRepository;

@Service
public class CategoryService implements CategoryServiceInterface {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category findOne(Integer id) {
        System.out.println("Service: id=" + id);
        return categoryRepository.getOne(id);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category partialUpdate(Category category) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void remove(Integer id) {
        categoryRepository.deleteById(id);
    }

}
