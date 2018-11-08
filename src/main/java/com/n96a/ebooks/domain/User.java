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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
public class User implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "firstname", columnDefinition = "VARCHAR(30)", length = 30, unique = false, nullable = false)
	private String firstName;// varchar(30)

	@Column(name = "lastname", columnDefinition = "VARCHAR(30)", length = 30, unique = false, nullable = false)
	private String lastName;

	@Column(name = "username", columnDefinition = "VARCHAR(10)", length = 10, unique = true, nullable = false)
	private String username; // varchar(10) ??

	@JsonIgnore
	@Column(name = "password", columnDefinition = "VARCHAR(10)", length = 10, unique = false, nullable = false)
	private String password; // varchar(10) ??

	@Column(name = "usertype", columnDefinition = "VARCHAR(30)", length = 30, unique = false, nullable = true)
	private String type; // varchar(30)

	@ManyToOne // User 0..n -> 0..1 Category
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	private Category category;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user") // User 1..1 -> 0..n Ebook
	private Set<Ebook> ebooks = new HashSet<Ebook>();

	public User() {
		super();
	}

	public User(Integer id, String firstName, String lastName, String username, String password, String type) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.type = type;
	}

	public User(Integer id, String firstName, String lastName, String username, String password, String type,
			Category category, Set<Ebook> ebooks) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.type = type;
		this.category = category;
		this.ebooks = ebooks;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Ebook> getEbooks() {
		return ebooks;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", username=" + username
				+ ", password=" + password + ", type=" + type + ", category=" + category + "]";
	}

}
