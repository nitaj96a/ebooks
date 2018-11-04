package com.n96a.ebooks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.service.EbookServiceInterface;

@RestController
@RequestMapping("/api/ebooks")
public class EbookController {

	@Autowired
	private EbookServiceInterface ebookService;
	
//	@GetMapping(value= {"", "/"})  //decide on a type
//	public getAll()
}
