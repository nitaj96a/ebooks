package com.n96a.ebooks.domain;

import java.io.Serializable;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "languages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Language implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", columnDefinition = "VARCHAR(30)", length = 30, unique = true, nullable = false)
	private String name;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "language") // Language 1..1 -> 0..n Ebook //collection of ebooks;
	private Set<Ebook> ebooks = new HashSet<Ebook>();

	public Language() {
		super();
	}

	public Language(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Language(Integer id, String name, Set<Ebook> ebooks) {
		super();
		this.id = id;
		this.name = name;
		this.ebooks = ebooks;
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

	public Set<Ebook> getEbooks() {
		return ebooks;
	}

	@Override
	public String toString() {
		return "Language [id=" + id + ", name=" + name + ", ebooks=" + ebooks + "]";
	}

}
