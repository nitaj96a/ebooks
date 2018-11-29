package com.n96a.ebooks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.domain.Category;
import com.n96a.ebooks.service.CategoryServiceInterface;

@RestController
public class CategoryController {

	@Autowired
	private CategoryServiceInterface categoryService;

	@GetMapping(value = "/api/categories")
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = categoryService.findAll();

		return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
	}
	
	@GetMapping(value = "api/categories/{id}", produces="application/json")
	public ResponseEntity<Category> getCategoryById(@PathVariable("id") Integer id) {
		System.out.println("Controller: id =" + id);
		Category category = categoryService.findOne(id);
		
		return new ResponseEntity<Category>(category, HttpStatus.OK);
	}
}
