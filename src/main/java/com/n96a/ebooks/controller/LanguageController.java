package com.n96a.ebooks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.domain.Language;
import com.n96a.ebooks.service.LanguageServiceInterface;

@RestController
@RequestMapping(value = "/api/languages")
public class LanguageController {
	
	@Autowired
	private LanguageServiceInterface languageService;
	
	@GetMapping
	public ResponseEntity<List<Language>> getAllLanguages(){
		List<Language> languages = languageService.findAll();
		
		return new ResponseEntity<List<Language>>(languages, HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Language> getLanguageById(@PathVariable("id") Integer id) {
		Language lang = languageService.findOne(id);
		return new ResponseEntity<Language>(lang, HttpStatus.OK);
	}

}
