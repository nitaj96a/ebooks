package com.n96a.ebooks.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Language {

	@Id
	@GeneratedValue
	private Integer id;
	// limit to 30 chars
	private String name;
	
	//@OneToMany //Language 1..1 -> 0..n Ebook //collection of ebooks; 
	
	
}
