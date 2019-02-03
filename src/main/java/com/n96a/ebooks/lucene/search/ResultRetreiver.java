package com.n96a.ebooks.lucene.search;

import com.n96a.ebooks.lucene.indexing.analysers.SerbianAnalyzer;
import com.n96a.ebooks.lucene.indexing.handlers.DocumentHandler;
import com.n96a.ebooks.lucene.indexing.handlers.PDFHandler;
import com.n96a.ebooks.lucene.indexing.handlers.TextDocHandler;
import com.n96a.ebooks.lucene.model.RequiredHighlight;
import com.n96a.ebooks.lucene.model.ResultData;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.InvalidTokenOffsetsException;
import org.apache.lucene.search.highlight.QueryScorer;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

public class ResultRetreiver {

    private TopScoreDocCollector collector;
    private static int maxHits = 10;

    public ResultRetreiver() {
        collector = TopScoreDocCollector.create(maxHits);
    }

    public static int getMaxHits() {
        return maxHits;
    }

    public static void setMaxHits(int maxHits) {
        ResultRetreiver.maxHits = maxHits;
    }

    public static List<ResultData> getResults(Query query, List<RequiredHighlight> requiredHighlights) {
        if (query == null) {
            return null;
        }
        try {
            Directory indexDir = new SimpleFSDirectory(FileSystems.getDefault().getPath(ResourceBundle.getBundle("application").getString("index")));
            DirectoryReader reader = DirectoryReader.open(indexDir);
            IndexSearcher indexSearcher = new IndexSearcher(reader);
            TopScoreDocCollector collector = TopScoreDocCollector.create(maxHits);
            List<ResultData> results = new ArrayList<ResultData>();

            indexSearcher.search(query, collector);
            ScoreDoc[] hits = collector.topDocs().scoreDocs;

            ResultData resultData;
            Document doc;
            Highlighter hl;
            SerbianAnalyzer sa = new SerbianAnalyzer();
            StandardAnalyzer stda = new StandardAnalyzer();
            for (ScoreDoc sd : hits) {
                doc = indexSearcher.doc(sd.doc);
                String[] allKeywords = doc.getValues("keyword");
                String keywords = "";

                for (String keyword : allKeywords) {
                    keywords += keyword.trim() + " ";
                }
                keywords = keywords.trim();
                String title = doc.get("title");
                String location = doc.get("filename");
                String highlight = "";
                for (RequiredHighlight rh : requiredHighlights) {
                    hl = new Highlighter(new QueryScorer(query, reader, rh.getFieldName()));
                    try {
                        highlight += hl.getBestFragment(sa, rh.getFieldName(),"" + getDocumentText(location));
                        //highlight += hl.getBestFragment(stda, rh.getFieldName(),"" + getDocumentText(location));
                    } catch (InvalidTokenOffsetsException e) {

                    }
                }
                resultData = new ResultData(title, keywords, location, highlight);
                results.add(resultData);
            }
            reader.close();
            return results;
        } catch (IOException e) {
            throw new IllegalArgumentException("U prosledjenom direktorijumu ne postoje indeksi ili je direktorijum zakljucan");
        }
    }

    private static String getDocumentText(String location) {
        File file = new File(location);
        DocumentHandler handler = getHandler(location);
        return handler.getText(file);
    }

    private static DocumentHandler getHandler(String fileName) {
        if(fileName.endsWith(".txt")){
            return new TextDocHandler();
        } else if (fileName.endsWith(".pdf")) {
            return new PDFHandler();
        } else {
            return null;
        }
    }
}
