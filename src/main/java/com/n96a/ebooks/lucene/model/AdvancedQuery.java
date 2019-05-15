package com.n96a.ebooks.lucene.model;

public class AdvancedQuery {
    private String title;
    private String titleType;
    private String author;
    private String authorType;
    private String keyword;
    private String keywordType;
    private String content;
    private String contentType;
    private int language;
    private String booleanSearch;
    private Integer categoryId;
    private boolean titleNot;
    private boolean authorNot;
    private boolean keywordNot;
    private boolean contentNot;

    public AdvancedQuery() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleType() {
        return titleType;
    }

    public void setTitleType(String titleType) {
        this.titleType = titleType;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthorType() {
        return authorType;
    }

    public void setAuthorType(String authorType) {
        this.authorType = authorType;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getKeywordType() {
        return keywordType;
    }

    public void setKeywordType(String keywordType) {
        this.keywordType = keywordType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public int getLanguage() {
        return language;
    }

    public void setLanguage(int language) {
        this.language = language;
    }

    public String getBooleanSearch() {
        return booleanSearch;
    }

    public void setBooleanSearch(String booleanSearch) {
        this.booleanSearch = booleanSearch;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isTitleNot() {
        return titleNot;
    }

    public void setTitleNot(boolean titleNot) {
        this.titleNot = titleNot;
    }

    public boolean isAuthorNot() {
        return authorNot;
    }

    public void setAuthorNot(boolean authorNot) {
        this.authorNot = authorNot;
    }

    public boolean isKeywordNot() {
        return keywordNot;
    }

    public void setKeywordNot(boolean keywordNot) {
        this.keywordNot = keywordNot;
    }

    public boolean isContentNot() {
        return contentNot;
    }

    public void setContentNot(boolean contentNot) {
        this.contentNot = contentNot;
    }
}
