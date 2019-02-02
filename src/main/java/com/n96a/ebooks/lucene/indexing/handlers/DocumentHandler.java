package com.n96a.ebooks.lucene.indexing.handlers;

import com.n96a.ebooks.lucene.model.IndexUnit;

import java.io.File;

public abstract class DocumentHandler {

    public abstract IndexUnit getIndexUnit(File file);
    public abstract String getText(File file);
}
