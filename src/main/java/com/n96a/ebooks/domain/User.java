package com.n96a.ebooks.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class User {
	private Integer id;
	private String firstName;//varchar(30)
	private String lastName;
	private String username; // varchar(10) ??
	private String user_password; // varchar(10) ??
	private String type; //varchar(30)
	
	//@ManyToOne // User 0..n -> 0..1 Category
	
	//@OneToMany // User 1..1 -> 0..n Ebook
}
