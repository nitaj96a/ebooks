package com.n96a.ebooks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.n96a.ebooks.model.Category;
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

    @GetMapping(value = "/api/categories/{id}", produces = "application/json")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Integer id) {
        System.out.println("Controller: id =" + id);
        Category category = categoryService.findOne(id);

        return new ResponseEntity<Category>(category, HttpStatus.OK);
    }

    @PostMapping(value = "/api/categories", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Category> createCategory(@RequestBody Category cat) {
        Category savedCategory = categoryService.create(cat);
        return new ResponseEntity<Category>(savedCategory, HttpStatus.OK);
    }

    @PutMapping(value = "/api/categories", produces = "application/json")
    public ResponseEntity<Category> editCategory(@RequestBody Category cat) {
        Category category = categoryService.update(cat);
        return new ResponseEntity<Category>(category, HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") Integer id) {
        categoryService.remove(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
