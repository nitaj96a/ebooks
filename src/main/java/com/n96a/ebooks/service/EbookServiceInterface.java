package com.n96a.ebooks.service;

import java.util.List;

import com.n96a.ebooks.model.Ebook;
import com.n96a.ebooks.model.User;

public interface EbookServiceInterface {

    Ebook findOne(Integer id);

    Ebook create(Ebook ebook);

    Ebook update(Ebook ebook);

    Ebook partialUpdate(Ebook ebook);

    void remove(Integer id);

    List<Ebook> findAll();

    List<Ebook> findByUser(User user);

    Ebook findByFilename(String filename);

}
