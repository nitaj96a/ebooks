package com.n96a.ebooks.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ebooks")
public class Ebook implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "title", columnDefinition = "VARCHAR(80)", length = 80, unique = false, nullable = false)
	private String title;

	@Column(name = "author", columnDefinition = "VARCHAR(120)", length = 120, unique = false, nullable = false)
	private String author;

	@Column(name = "keywords", columnDefinition = "VARCHAR(120)", length = 120, unique = false, nullable = true) // csvstring?
	private String keywords;

	@Column(name = "publicationyear", unique = false, nullable = false)
	private Integer publicationYear; // Integer ?

	@Column(name = "filename", columnDefinition = "VARCHAR(200)", length = 200, unique = true, nullable = false)
	private String filename;

	@Column(name = "thumbnailpath", columnDefinition = "VARCHAR(200)", length = 200, unique = true, nullable = false)
	private String thumbnailPath;

	@Column(name = "MIME", columnDefinition = "VARCHAR(100)", length = 100, unique = false, nullable = true)
	private String MIME;

	@ManyToOne() // Ebook 0..n -> 1..1 Language
	@JoinColumn(name = "language_id", referencedColumnName = "id")
	private Language language;

	
	@ManyToOne // Ebook 0..n -> 1..1 Category // Why not make a book belong in multiple
				// categories?
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	private Category category;

	@JsonIgnore // @JsonIgnoreProperty()
	@ManyToOne // Ebook 0..n -> 1..1 User
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	public Ebook() {
		super();
	}

	public Ebook(Integer id, String title, String author, String keywords, Integer publicationYear, String filename,
			String mIME) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.keywords = keywords;
		this.publicationYear = publicationYear;
		this.filename = filename;
		MIME = mIME;
	}

	public Ebook(Integer id, String title, String author, String keywords, Integer publicationYear, String filename,
			String thumbnailPath, String mIME) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.keywords = keywords;
		this.publicationYear = publicationYear;
		this.filename = filename;
		this.thumbnailPath = thumbnailPath;
		MIME = mIME;
	}

	public Ebook(Integer id, String title, String author, String keywords, Integer publicationYear, String filename,
			String mIME, Language language, Category category, User user) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.keywords = keywords;
		this.publicationYear = publicationYear;
		this.filename = filename;
		MIME = mIME;
		this.language = language;
		this.category = category;
		this.user = user;
	}

	public Ebook(Integer id, String title, String author, String keywords, Integer publicationYear, String filename,
			String thumbnailPath, String mIME, Language language, Category category, User user) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.keywords = keywords;
		this.publicationYear = publicationYear;
		this.filename = filename;
		this.thumbnailPath = thumbnailPath;
		MIME = mIME;
		this.language = language;
		this.category = category;
		this.user = user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public Integer getPublicationYear() {
		return publicationYear;
	}

	public void setPublicationYear(Integer publicationYear) {
		this.publicationYear = publicationYear;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getThumbnailPath() {
		return thumbnailPath;
	}

	public void setThumbnailPath(String thumbnailPath) {
		this.thumbnailPath = thumbnailPath;
	}

	public String getMIME() {
		return MIME;
	}

	public void setMIME(String mIME) {
		MIME = mIME;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Ebook [id=" + id + ", title=" + title + ", author=" + author + ", keywords=" + keywords
				+ ", publicationYear=" + publicationYear + ", filename=" + filename + ", thumbnailPath=" + thumbnailPath
				+ ", MIME=" + MIME + ", language=" + language.getName() + ", category=" + category.getName() + ", user=" + user.getUsername() + "]";
	}

}
