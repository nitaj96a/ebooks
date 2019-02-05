package com.n96a.ebooks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.n96a.ebooks.model.Ebook;
import com.n96a.ebooks.service.EbookServiceInterface;

@RestController
@RequestMapping("/api/ebooks")
public class EbookController {

    @Autowired
    private EbookServiceInterface ebookService;

    @GetMapping(value = {"", "/"}) // decide on a type
    public ResponseEntity<List<Ebook>> getAllUsers() {
        List<Ebook> ebooks = ebookService.findAll();

        return new ResponseEntity<List<Ebook>>(ebooks, HttpStatus.OK);
    }

    @GetMapping(value = {"{id}", "/{id}"}) // decide on a type
    public ResponseEntity<Ebook> getUserById(@PathVariable("id") Integer id) {
        Ebook ebook = ebookService.findOne(id);

        return new ResponseEntity<Ebook>(ebook, HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Ebook> create(@RequestBody Ebook ebook) {
        // validation ?
        Ebook savedEbook = ebookService.create(ebook);

        return new ResponseEntity<Ebook>(savedEbook, HttpStatus.OK);
    }

    @PutMapping(consumes = "application/json")
    public ResponseEntity<Ebook> update(@RequestBody Ebook ebook) {
        Ebook currentEbook = ebookService.findOne(ebook.getId());
        // validation classes?
        if (currentEbook != null) {
            currentEbook = ebookService.update(ebook);
            return new ResponseEntity<Ebook>(currentEbook, HttpStatus.OK);
        } else {
            return new ResponseEntity<Ebook>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping(consumes = "application/json")
    public ResponseEntity<Ebook> partialUpdate(@RequestBody Ebook ebook) {

        return null;
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        Ebook ebook = ebookService.findOne(id);
        if (ebook != null) {
            ebookService.remove(id);
            return new ResponseEntity<Void>(HttpStatus.OK); // 201, 204??
        } else {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
}
