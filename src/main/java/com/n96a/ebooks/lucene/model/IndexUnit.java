package com.n96a.ebooks.lucene.model;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;

import java.util.ArrayList;
import java.util.List;

public class IndexUnit {
    private String title;
    private String text;
    private List<String> keywords = new ArrayList<>();
    private String filename;
    private String filedate;
    private String language;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFiledate() {
        return filedate;
    }

    public void setFiledate(String filedate) {
        this.filedate = filedate;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Document getLuceneDocument(){
        Document document = new Document();
        document.add(new TextField("title", title, Field.Store.YES));
        document.add(new TextField("text", text, Field.Store.NO));
        for (String keyword: keywords) {
            document.add(new TextField("keyword", keyword, Field.Store.YES));
        }
        document.add(new StringField("filename", filename, Field.Store.YES));
        document.add(new TextField("filedate", filedate, Field.Store.YES));

        return document;
    }
}
