package com.n96a.ebooks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.n96a.ebooks.domain.Language;
import com.n96a.ebooks.repository.LanguageRepository;

@Service
public class LanguageService implements LanguageServiceInterface {

    @Autowired
    LanguageRepository languageRepository;

    @Override
    public List<Language> findAll() {
        return languageRepository.findAll();
    }

    @Override
    public Language findOne(Integer id) {
        return languageRepository.getOne(id);
    }


}
