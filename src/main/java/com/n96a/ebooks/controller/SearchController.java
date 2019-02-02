package com.n96a.ebooks.controller;

import com.n96a.ebooks.lucene.model.RequiredHighlight;
import com.n96a.ebooks.lucene.model.ResultData;
import com.n96a.ebooks.lucene.model.SearchType;
import com.n96a.ebooks.lucene.model.SimpleQuery;
import com.n96a.ebooks.lucene.search.QueryBuilder;
import com.n96a.ebooks.lucene.search.ResultRetreiver;
import org.apache.lucene.search.Query;
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


    @PostMapping(value = "/term")
    public ResponseEntity<List<ResultData>> searchTermQuery(@RequestBody SimpleQuery simpleQuery) throws Exception{
         Query query = QueryBuilder.buildQuery(SearchType.regular, simpleQuery.getField(), simpleQuery.getValue());
         List<RequiredHighlight> requiredHighlights = new ArrayList<RequiredHighlight>();
         requiredHighlights.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
         List<ResultData> results = ResultRetreiver.getResults(query, requiredHighlights);
         return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
    }
}
