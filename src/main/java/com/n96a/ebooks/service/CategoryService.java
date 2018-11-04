package com.n96a.ebooks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.n96a.ebooks.domain.Category;
import com.n96a.ebooks.repository.CategoryRepository;


@Service
public class CategoryService implements CategoryServiceInterface {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public Category findOne(Integer id) {
		return categoryRepository.getOne(id);
	}
	
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}
	
	
	
}
