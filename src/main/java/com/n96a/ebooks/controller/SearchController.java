package com.n96a.ebooks.controller;

import com.n96a.ebooks.DTO.CategoryDTO;
import com.n96a.ebooks.DTO.EbookDTO;
import com.n96a.ebooks.DTO.LanguageDTO;
import com.n96a.ebooks.DTO.UserDTO;
import com.n96a.ebooks.lucene.model.*;
import com.n96a.ebooks.model.Ebook;
import com.n96a.ebooks.lucene.search.QueryBuilder;
import com.n96a.ebooks.lucene.search.ResultRetreiver;
import com.n96a.ebooks.model.Language;
import com.n96a.ebooks.service.*;

import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.xml.builders.BooleanQueryBuilder;
import org.apache.lucene.search.*;
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

    @PostMapping(value = "/simple")
    public ResponseEntity<List<Ebook>> simpleSearch(@RequestBody SimpleQuery simpleQuery) throws Exception{
        Query query = null;
        if (simpleQuery.getType().equals("Term")) {
            query = QueryBuilder.buildQuery(SearchType.regular, simpleQuery.getField(), simpleQuery.getValue());
        } else if (simpleQuery.getType().equals("Phrase")) {
            query= QueryBuilder.buildQuery(SearchType.phrase, simpleQuery.getField(), simpleQuery.getValue());
        } else if (simpleQuery.getType().equals("Fuzzy")) {
            query= QueryBuilder.buildQuery(SearchType.fuzzy, simpleQuery.getField(), simpleQuery.getValue());
        }

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

    @PostMapping(value = "/advanced")
    public ResponseEntity<List<Ebook>> advancedSearch(@RequestBody AdvancedQuery advancedQuery) throws ParseException {
        String title = null;
        String author = null;
        String keyword = null;
        String text = null;
        Query titleQuery = null;
        Query authorQuery = null;
        Query keywordQuery = null;
        Query textQuery = null;
        List<Query> queries = new ArrayList<Query>();
        BooleanQuery.Builder bqBuilder = new BooleanQuery.Builder();
        BooleanQuery.Builder innerBq1Builder = new BooleanQuery.Builder();
        BooleanQuery.Builder innerBq2Builder = new BooleanQuery.Builder();
        List<RequiredHighlight> requiredHighlights = new ArrayList<RequiredHighlight>();
        if (advancedQuery.getTitle() != null) {
            title = advancedQuery.getTitle();
        }
        if (advancedQuery.getAuthor() != null) {
            author = advancedQuery.getAuthor();
        }
        if (advancedQuery.getKeyword() != null) {
            keyword = advancedQuery.getKeyword();
        }
        if (advancedQuery.getContent() != null) {
            text = advancedQuery.getContent();
        }

        if (title != null) {
            if (advancedQuery.getTitleType().equals("Term")) {
                titleQuery = QueryBuilder.buildQuery(SearchType.regular, "title", title);
            } else if (advancedQuery.getTitleType().equals("Phrase")) {
                titleQuery = QueryBuilder.buildQuery(SearchType.phrase, "title", title);
            } else if (advancedQuery.getTitleType().equals("Fuzzy")) {
                titleQuery = QueryBuilder.buildQuery(SearchType.fuzzy, "title", title);
            }
            requiredHighlights.add(new RequiredHighlight("title", title));
            queries.add(titleQuery);
        }
        if (author != null) {
            if (advancedQuery.getAuthorType().equals("Term")) {
                authorQuery = QueryBuilder.buildQuery(SearchType.regular, "author", author);
            } else if (advancedQuery.getAuthorType().equals("Phrase")) {
                authorQuery = QueryBuilder.buildQuery(SearchType.phrase, "author", author);
            } else if (advancedQuery.getAuthorType().equals("Fuzzy")) {
                authorQuery = QueryBuilder.buildQuery(SearchType.fuzzy, "author", author);
            }
            requiredHighlights.add(new RequiredHighlight("author", author));
            queries.add(authorQuery);
        }
        if (keyword != null) {
            if (advancedQuery.getKeywordType().equals("Term")) {
                keywordQuery = QueryBuilder.buildQuery(SearchType.regular, "keyword", keyword);
            } else if (advancedQuery.getKeywordType().equals("Phrase")) {
                keywordQuery = QueryBuilder.buildQuery(SearchType.phrase, "keyword", keyword);
            } else if (advancedQuery.getKeywordType().equals("Fuzzy")) {
                keywordQuery = QueryBuilder.buildQuery(SearchType.fuzzy, "keyword", keyword);
            }
            requiredHighlights.add(new RequiredHighlight("keyword", keyword));
            queries.add(keywordQuery);
        }
        if (text != null) {
            if (advancedQuery.getContentType().equals("Term")) {
                textQuery = QueryBuilder.buildQuery(SearchType.regular, "text", text);
            } else if (advancedQuery.getContentType().equals("Phrase")) {
                textQuery = QueryBuilder.buildQuery(SearchType.phrase, "text", text);
            } else if (advancedQuery.getContentType().equals("Fuzzy")) {
                textQuery = QueryBuilder.buildQuery(SearchType.fuzzy, "text", text);
            }
            requiredHighlights.add(new RequiredHighlight("text", text));
            queries.add(textQuery);
        }

        BooleanClause.Occur occur = BooleanClause.Occur.SHOULD;
        if (advancedQuery.getBooleanSearch() != null && advancedQuery.getBooleanSearch().equals("AND")) {
            occur = BooleanClause.Occur.MUST;
        } else if (advancedQuery.getBooleanSearch() != null && advancedQuery.getBooleanSearch().equals("OR")) {
            occur = BooleanClause.Occur.SHOULD;
        }
//        if (advancedQuery.getBooleanSearch().equals("AND")
//                || advancedQuery.getBooleanSearch().equals("OR")) {
            for (Query query: queries) {
                bqBuilder.add(query, occur);
            }
            Query q = bqBuilder.build();
            System.out.println(q.toString());

            List<ResultData> results = ResultRetreiver.getResults(q, requiredHighlights);
            List<Ebook> ebooks = new ArrayList<Ebook>();
            populateEbooksFromResults(results, ebooks, advancedQuery.getLanguage());
//            for (Ebook ebook : ebooks) {
//                if (ebook.getLanguage().getId() != advancedQuery.getLanguage()) {
//                    ebooks.remove(ebook);
//                }
//            }
//            //filterByLanguage(ebooks, advancedQuery.getLanguage());

            return new ResponseEntity<List<Ebook>>(ebooks, HttpStatus.OK);
//        }



        //return null;
    }
    private void populateEbooksFromResults(List<ResultData> results, List<Ebook> ebooks, Integer langId) {
        for (ResultData rd : results) {
            String locationRaw = rd.getLocation();
            String[] locationSplit = locationRaw.split("\\\\");
            String location = locationSplit[locationSplit.length-1];
            Ebook ebook = ebookService.findByFilename(location);
            System.out.println(langId);
            if (langId != 0 && ebook.getLanguage().getId() != langId){
                continue;
            }
            String highlight = rd.getHighlight();
            ebook.setHighlight(highlight);
            ebooks.add(ebook);
        }
    }

    private void filterByLanguage(List<Ebook> ebooks, Integer langId) {
        for (Ebook ebook : ebooks) {
            if (ebook.getLanguage().getId() != langId) {
                ebooks.remove(ebook);
            }
        }
    }

    private String createQueryString(AdvancedQuery advancedQuery) {
        String queryString = "";
        String title = null;
        String author = null;
        String keyword = null;
        String text = null;
        if (advancedQuery.getTitle() != null) {
            title = advancedQuery.getTitle();
        }
        if (advancedQuery.getAuthor() != null) {
            author = advancedQuery.getAuthor();
        }
        if (advancedQuery.getKeyword() != null) {
            keyword = advancedQuery.getKeyword();
        }
        if (advancedQuery.getContent() != null) {
            text = advancedQuery.getContent();
        }

        if (title != null) {

            if (advancedQuery.getBooleanSearch() != null) {
                queryString += "(";
            }

            if (advancedQuery.getTitleType().equals("Term")) {
                queryString += " title:(";
                for (String term : title.split(" ")) {
                    queryString += "+" + term + " " ;
                }
                queryString += " )";
            } else if (advancedQuery.getTitleType().equals("Phrase")) {
                queryString += " title:\"" + title + "\"";
            } else if (advancedQuery.getTitleType().equals("Fuzzy")) {
                queryString += " title:" + title + "~";
            }

            if (advancedQuery.getBooleanSearch().equals("AND")) {
                if (author == null && keyword == null && text == null) {
                    queryString += ")";
                } else {
                    queryString += ") AND ";
                }

            } else if (advancedQuery.getBooleanSearch().equals("OR")) {

                if (author == null && keyword == null && text == null) {
                    queryString += ")";
                } else {
                    queryString += ") OR ";
                }
            }
        }

        if (author != null) {

            if (advancedQuery.getBooleanSearch() != null) {
                queryString += "(";
            }

            if (advancedQuery.getAuthorType().equals("Term")) {
                queryString += " author:(";
                for (String term : author.split(" ")) {
                    queryString += "+" + term + " ";
                }
                queryString += " )";
            } else if (advancedQuery.getAuthorType().equals("Phrase")) {
                queryString += " author:\"" + author + "\"";
            } else if (advancedQuery.getAuthorType().equals("Fuzzy")) {
                queryString += " author:" + author + "~";
            }

            if (advancedQuery.getBooleanSearch().equals("AND")) {
                if (keyword == null && text == null) {
                    queryString += ")";
                } else {
                    queryString += ") AND ";
                }
            } else if (advancedQuery.getBooleanSearch().equals("OR")) {
                if (keyword == null && text == null) {
                    queryString += ")";
                } else {
                    queryString += ") OR ";
                }
            }

        }

        if (keyword != null) {

            if (advancedQuery.getBooleanSearch() != null) {
                queryString += "(";
            }

            if (advancedQuery.getKeyword().equals("Term")) {
                queryString += "keyword: (";
                for (String term : keyword.split(" ")) {
                    queryString += "+" + term + " ";
                }
                queryString += ")";
            } else if (advancedQuery.getKeyword().equals("Phrase")) {
                queryString += " keyword:\"" + keyword + "\"";
            } else if (advancedQuery.getKeyword().equals("Fuzzy")) {
                queryString += " keyword:" + keyword + "~";
            }

            if (advancedQuery.getBooleanSearch().equals("AND")) {
                if (text == null) {
                    queryString += ")";
                } else {
                    queryString += ") AND ";
                }
            } else if (advancedQuery.getBooleanSearch().equals("OR")) {
                if (text == null) {
                    queryString += ")";
                } else {
                    queryString += ") OR ";
                }
            }
        }

        if (text != null) {

            if (advancedQuery.getBooleanSearch() != null) {
                queryString += "(";
            }

            if (advancedQuery.getContentType().equals("Term")) {
                queryString += " text:(";
                for (String term : text.split(" ")) {
                    queryString += "+" + term + " ";
                }
                queryString += ") ";
            } else if (advancedQuery.getContentType().equals("Phrase")) {
                queryString += " text:\"" + text + "\"";
            } else if (advancedQuery.getContentType().equals("Fuzzy")) {
                queryString += " text:" + text + "~";
            }

            queryString += ")";
        }

        if (queryString.endsWith("AND ( ")) {
            queryString += " * )";
        } else if (queryString.endsWith("OR ( ")) {
            queryString += " )";
        }

        return queryString;
    }


//        Query query = QueryBuilder
        //form a query string


         //       return null;
//        return new ResponseEntity<List<Ebook>>(ebooks, HttpStatus.OK);
}

