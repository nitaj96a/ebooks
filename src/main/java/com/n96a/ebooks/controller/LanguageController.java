package com.n96a.ebooks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.n96a.ebooks.model.Language;
import com.n96a.ebooks.service.LanguageServiceInterface;

@RestController
@RequestMapping(value = "/api/languages")
public class LanguageController {

    @Autowired
    private LanguageServiceInterface languageService;

    @GetMapping
    public ResponseEntity<List<Language>> getAllLanguages() {
        List<Language> languages = languageService.findAll();

        return new ResponseEntity<List<Language>>(languages, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Language> getLanguageById(@PathVariable("id") Integer id) {
        Language lang = languageService.findOne(id);
        return new ResponseEntity<Language>(lang, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Language> create(@RequestBody Language lang) {
        Language savedLang = languageService.create(lang);
        return new ResponseEntity<Language>(savedLang, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Language> update(@RequestBody Language lang) {
        Language savedLang = languageService.update(lang);
        return new ResponseEntity<Language>(savedLang, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        languageService.delete(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
