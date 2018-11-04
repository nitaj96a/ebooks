package com.n96a.ebooks.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Ebook {
	private Integer id;
	private String title;// varchar(80)
	private String author;// varchar(120)
	private String keywords;// varchar(120)
	private Integer publicationYear; //Integer ?
	private String filename; //varchar(200)
	private String MIME; //varchar(100)
	
	//@ManyToOne //Ebook 0..n -> 1..1 Language
	
	//@ManyToOne //Ebook 0..n -> 1..1 Category
	
	//@ManyToOne //Ebook 0..n -> 1..1 User 
	
}
