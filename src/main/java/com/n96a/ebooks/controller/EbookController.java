package com.n96a.ebooks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.domain.Ebook;
import com.n96a.ebooks.service.EbookServiceInterface;

@RestController
@RequestMapping("/api/ebooks")
public class EbookController {

	@Autowired
	private EbookServiceInterface ebookService;
	
	@GetMapping(value= {"", "/"})  //decide on a type
	public ResponseEntity<List<Ebook>> getAllUsers(){
		List<Ebook> ebooks = ebookService.findAll();
		
		return new ResponseEntity<List<Ebook>>(ebooks, HttpStatus.OK);
		
		
	}
}
