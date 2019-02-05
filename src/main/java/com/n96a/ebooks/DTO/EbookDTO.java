package com.n96a.ebooks.DTO;

import com.n96a.ebooks.model.Ebook;

public class EbookDTO {
    private Integer id;
    private String title;
    private String author;
    private String keywords;
    private Integer publicationYear;
    private String filename;
    private String thumbnailPath;
    private String mime;
    private LanguageDTO languageDTO;
    private CategoryDTO categoryDTO;
    private UserDTO userDTO;
    private String highlight;

    public EbookDTO(Integer id, String title, String author, String keywords, Integer publicationYear, String filename, String thumbnailPath, String mIME, LanguageDTO languageDTO, CategoryDTO categoryDTO, UserDTO userDTO, String highlight) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.keywords = keywords;
        this.publicationYear = publicationYear;
        this.filename = filename;
        this.thumbnailPath = thumbnailPath;
        this.mime = mIME;
        this.languageDTO = languageDTO;
        this.categoryDTO = categoryDTO;
        this.userDTO = userDTO;
        this.highlight = highlight;
    }

    public EbookDTO(Ebook ebook) {

    }

    public EbookDTO(Ebook ebook, LanguageDTO languageDTO, CategoryDTO categoryDTO, UserDTO userDTO, String highlight) {
        this(
                ebook.getId(),
                ebook.getTitle(),
                ebook.getAuthor(),
                ebook.getKeywords(),
                ebook.getPublicationYear(),
                ebook.getFilename(),
                ebook.getThumbnailPath(),
                ebook.getMIME(),
                languageDTO,
                categoryDTO,
                userDTO,
                highlight
        );
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

    public String getMime() {
        return mime;
    }

    public void setMime(String mime) {
        this.mime = mime;
    }

    public LanguageDTO getLanguageDTO() {
        return languageDTO;
    }

    public void setLanguageDTO(LanguageDTO languageDTO) {
        this.languageDTO = languageDTO;
    }

    public CategoryDTO getCategoryDTO() {
        return categoryDTO;
    }

    public void setCategoryDTO(CategoryDTO categoryDTO) {
        this.categoryDTO = categoryDTO;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public String getHighlight() {
        return highlight;
    }

    public void setHighlight(String highlight) {
        this.highlight = highlight;
    }
}
