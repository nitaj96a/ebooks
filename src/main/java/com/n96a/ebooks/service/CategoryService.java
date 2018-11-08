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

	@Override
	public Category findOne(Integer id) {
		return categoryRepository.getOne(id);
	}

	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

	@Override
	public Category create(Category category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category update(Category category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category partialUpdate(Category category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void remove(Integer id) {
		// TODO Auto-generated method stub

	}

}
