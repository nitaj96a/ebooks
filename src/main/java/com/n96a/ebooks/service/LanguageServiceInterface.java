package com.n96a.ebooks.service;

import java.util.List;

import com.n96a.ebooks.model.Language;

public interface LanguageServiceInterface {

    Language findOne(Integer id);

    List<Language> findAll();

    Language create(Language l);

    Language update(Language l);

    void delete(Integer id);
}
