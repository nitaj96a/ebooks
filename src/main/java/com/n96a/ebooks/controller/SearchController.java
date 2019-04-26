package com.n96a.ebooks.controller;

import com.n96a.ebooks.DTO.CategoryDTO;
import com.n96a.ebooks.DTO.EbookDTO;
import com.n96a.ebooks.DTO.LanguageDTO;
import com.n96a.ebooks.DTO.UserDTO;
import com.n96a.ebooks.model.Ebook;
import com.n96a.ebooks.lucene.model.RequiredHighlight;
import com.n96a.ebooks.lucene.model.ResultData;
import com.n96a.ebooks.lucene.model.SearchType;
import com.n96a.ebooks.lucene.model.SimpleQuery;
import com.n96a.ebooks.lucene.search.QueryBuilder;
import com.n96a.ebooks.lucene.search.ResultRetreiver;
import com.n96a.ebooks.model.Language;
import com.n96a.ebooks.service.*;
import org.apache.lucene.search.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/search", consumes = "application/json")
public class SearchController {

    @Autowired
    private EbookServiceInterface ebookService;

    @Autowired
    private CategoryServiceInterface categoryService;

    @Autowired
    private LanguageServiceInterface languageService;

    @Autowired
    private UserServiceInterface userService;

    @PostMapping(value = "/term")
    public ResponseEntity<List<Ebook>> searchTermQuery(@RequestBody SimpleQuery simpleQuery) throws Exception{
         Query query = QueryBuilder.buildQuery(SearchType.regular, simpleQuery.getField(), simpleQuery.getValue());
         List<RequiredHighlight> requiredHighlights = new ArrayList<RequiredHighlight>();
         requiredHighlights.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
         List<ResultData> results = ResultRetreiver.getResults(query, requiredHighlights);
//         List<EbookDTO> ebookDTOs = new ArrayList<EbookDTO>();
        List<Ebook> ebooks = new ArrayList<Ebook>();
         for (ResultData rd : results) {
             String locationRaw = rd.getLocation();
             String[] locationSplit = locationRaw.split("\\\\");
             String location = locationSplit[locationSplit.length-1];
             Ebook ebook = ebookService.findByFilename(location);
//             LanguageDTO langDTO = new LanguageDTO(ebook.getLanguage());
//             CategoryDTO catDTO = new CategoryDTO(ebook.getCategory());
//             UserDTO userDTO = new UserDTO(ebook.getUser());
             String highlight = rd.getHighlight();
             ebook.setHighlight(highlight);
//             EbookDTO ebookDTO = new EbookDTO(ebook, langDTO, ebook.getCategory(), userDTO, highlight);
//             ebookDTOs.add(ebookDTO);
             ebooks.add(ebook);
         }
         return new ResponseEntity<List<Ebook>>(ebooks, HttpStatus.OK);
    }
}
