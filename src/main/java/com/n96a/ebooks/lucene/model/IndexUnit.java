package com.n96a.ebooks.lucene.model;

import com.n96a.ebooks.domain.Ebook;
import com.n96a.ebooks.service.EbookService;
import com.n96a.ebooks.service.EbookServiceInterface;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


//@Component
public class IndexUnit {

   // @Autowired
    //private EbookServiceInterface ebookService;

    private String title;
    private String text;
    private String author;
    private List<String> keywords = new ArrayList<>();
    private String filename;
    private String filedate;
    private String language;

    public IndexUnit() {
    }

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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
        document.add(new StringField("filename", filename, Field.Store.YES));
       // Ebook ebook = ebookService.findByFilename(filename);
        //String keywordsLine = ebook.getKeywords();
        //setKeywords(new ArrayList<String>(Arrays.asList(keywordsLine.split(", "))));
        document.add(new TextField("title", title, Field.Store.YES));
        document.add(new TextField("text", text, Field.Store.YES));
        document.add(new TextField("author", author, Field.Store.YES));
        for (String keyword: keywords) {
            document.add(new TextField("keyword", keyword, Field.Store.YES));
        }

        //document.add(new TextField("filedate", filedate, Field.Store.YES));

        return document;
    }
}
