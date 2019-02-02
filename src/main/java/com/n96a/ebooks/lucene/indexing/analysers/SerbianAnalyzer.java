package com.n96a.ebooks.lucene.indexing.analysers;

import com.n96a.ebooks.lucene.indexing.filters.CyrillicToLatinFilter;
import org.apache.lucene.analysis.*;
import org.apache.lucene.analysis.standard.StandardTokenizer;

import java.io.Reader;

public class SerbianAnalyzer extends Analyzer {

    public static final String[] STOP_WORDS = {
            "i","a","ili","ali","pa","te","da","u","po","na"
    };

    public SerbianAnalyzer(){

    }

    @Override
    protected TokenStreamComponents createComponents(String fieldName) {
        Tokenizer source = new StandardTokenizer();
        TokenStream result = new CyrillicToLatinFilter(source);
        result = new LowerCaseFilter(result);
        result = new StopFilter(result, StopFilter.makeStopSet(STOP_WORDS));
        return new TokenStreamComponents(source, result) {
            @Override
            protected void setReader(Reader reader) {
                super.setReader(reader);
            }
        };
    }
}
