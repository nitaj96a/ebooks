package com.n96a.ebooks.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	@Column(length = 30, unique = true, nullable = false)
	private String name; // varchar(30)

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "category") // Category 0..1 -> 0..n User
	private Set<User> users = new HashSet<User>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "category") // Category 1..1 -> 0..n Ebook // why not ManyToMany ?
	private Set<Ebook> ebooks = new HashSet<Ebook>();

	public Category() {

	}

	public Category(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<User> getUsers() {
		return users;
	}

	// Use getUsers to modify the set!
//	public void setUsers(Set<User> users) {
//		this.users = users;
//	}

	public Set<Ebook> getEbooks() {
		return ebooks;
	}

	// Use getEbooks to modify the set!
//	public void setEbooks(Set<Ebook> ebooks) {
//		this.ebooks = ebooks;
//	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + ", users=" + users + ", ebooks=" + ebooks + "]";
	}

}
