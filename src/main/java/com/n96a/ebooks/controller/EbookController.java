package com.n96a.ebooks.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.n96a.ebooks.DTO.CategoryDTO;
import com.n96a.ebooks.DTO.EbookDTO;
import com.n96a.ebooks.DTO.LanguageDTO;
import com.n96a.ebooks.DTO.UserDTO;
import com.n96a.ebooks.lucene.indexing.Indexer;
import com.n96a.ebooks.model.Category;
import com.n96a.ebooks.model.Language;
import com.n96a.ebooks.model.User;
import com.n96a.ebooks.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.n96a.ebooks.model.Ebook;

@RestController
@RequestMapping("/api/ebooks")
public class EbookController {

    @Autowired
    private EbookServiceInterface ebookService;

    @Autowired
    private LanguageServiceInterface languageService;

    @Autowired
    private UserServiceInterface userService;

    @Autowired
    private CategoryServiceInterface categoryService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private FileController fileController;

    @GetMapping(value = {"", "/"}) // decide on a type
    public ResponseEntity<List<Ebook>> getAllUsers() {
        List<Ebook> ebooks = ebookService.findAll();
//        List<EbookDTO> ebookDTOs = new ArrayList<EbookDTO>();

//        for (Ebook e : ebooks) {
//            ebookDTOs.add(new EbookDTO(e));
//        }

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
//        if (ebookDTO.getThumbnailPath() == null) {
//            ebookDTO.setThumbnailPath("default.jpg");
//        }
            if (ebook.getThumbnailPath() == null) {
                ebook.setThumbnailPath("default.jpg");
            }
            ebook.setMIME("application/pdf");
            User user = userService.findOne(ebook.getUser().getId());
            ebook.setUser(user);
            Language language = languageService.findOne(ebook.getLanguage().getId());
            ebook.setLanguage(language);
//        Ebook ebook = new Ebook();
//        ebook.setTitle(ebookDTO.getTitle());
//        ebook.setAuthor(ebookDTO.getAuthor());
//        ebook.setKeywords(ebookDTO.getKeywords());
//        ebook.setPublicationYear(ebookDTO.getPublicationYear());
//        ebook.setFilename(ebookDTO.getFilename());
//        ebook.setThumbnailPath(ebookDTO.getThumbnailPath());
//        ebook.setMIME(ebookDTO.getMime());
//        if (ebookDTO.getLanguageDTO() != null) {
//            Language lang = languageService.findOne(ebookDTO.getLanguageDTO().getId());
//            ebook.setLanguage(lang);
//        }
//        if (ebookDTO.getCategoryDTO() != null) {
//            Category cat = categoryService.findOne(ebookDTO.getCategoryDTO().getId());
//            ebook.setCategory(cat);
//        }
//        if (ebookDTO.getUserDTO() != null) {
//            User user = userService.findOne(ebookDTO.getUserDTO().getId());
//            ebook.setUser(user);
//        }

        Ebook savedEbook = ebookService.create(ebook);
        File file = fileStorageService.getFile(ebook.getFilename());
        Indexer.getInstance().index(file);
//        CategoryDTO categoryDTO = new CategoryDTO(savedEbook.getCategory());
//        LanguageDTO languageDTO = new LanguageDTO(savedEbook.getLanguage());
//        UserDTO userDTO = new UserDTO(savedEbook.getUser());
//        EbookDTO savedEbookDTO = new EbookDTO(savedEbook, languageDTO, savedEbook.getCategory(), userDTO, "");

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

    @CrossOrigin()
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
