package com.n96a.ebooks.domain;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Category {
	private Integer id;
	private String name; //varchar(30)
	
	//@OneToMany //Category 0..1 -> 0..n User
	
	//@OneToMany //Category 1..1 -> 0..n Ebook // why not ManyToMany ?
}
