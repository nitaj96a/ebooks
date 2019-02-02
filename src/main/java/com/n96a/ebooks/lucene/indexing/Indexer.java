package com.n96a.ebooks.lucene.indexing;

import com.n96a.ebooks.lucene.indexing.handlers.DocumentHandler;
import com.n96a.ebooks.lucene.indexing.handlers.PDFHandler;
import com.n96a.ebooks.lucene.indexing.handlers.TextDocHandler;
import com.n96a.ebooks.lucene.model.IndexUnit;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.*;
import org.apache.lucene.search.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.SimpleFSDirectory;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.util.List;
import java.util.ResourceBundle;

public class Indexer {

    private Directory indexDir;
    private IndexWriter indexWriter;
    private File indexDirPath; // ?

    private static Indexer indexer = new Indexer();

    public static Indexer getInstance() {
        return indexer;
    } // singleton

    private Indexer(String path, boolean restart) {
        System.out.println("PATH: " + path);
        IndexWriterConfig iwc = new IndexWriterConfig();     //(new SerbianAnalyzer());

        if (restart) {
            iwc.setOpenMode(IndexWriterConfig.OpenMode.CREATE);
        } else {
            iwc.setOpenMode(IndexWriterConfig.OpenMode.CREATE_OR_APPEND);
        }

        try {
            this.indexDir = new SimpleFSDirectory(FileSystems.getDefault().getPath(path));
            this.indexWriter = new IndexWriter(this.indexDir, iwc);
        } catch (IOException ioe) {
            throw new IllegalArgumentException("Path not correct");
        }
    }

    private Indexer(boolean restart) {
        this(ResourceBundle.getBundle("application").getString("index"), restart);
    }

    private Indexer() {this(false);}

    public Directory getIndexDir() {
        return indexDir;
    }

    public IndexWriter getIndexWriter() {
        return indexWriter;
    }

    public File getIndexDirPath() {
        return indexDirPath;
    }

    public boolean delete(String filename){
        Term deletionTerm = new Term("filename", filename);
        try {
            synchronized (this) {
                this.indexWriter.deleteDocuments(deletionTerm);
                this.indexWriter.commit();
            }
            return true;
        } catch (IOException ioe) {
            return false;
        }
    }


    public boolean add(Document doc){
        try {
            synchronized (this) {
                this.indexWriter.addDocument(doc);
                this.indexWriter.commit();
            }
            return true;
        } catch (IOException ioe) {
            return false;
        }
    }

    public boolean updateDocument(String filename, List<IndexableField> fields){
        try{
            DirectoryReader reader = DirectoryReader.open(this.indexDir);
            IndexSearcher is = new IndexSearcher(reader);
            Query query = new TermQuery(new Term("filename", filename));
            TopScoreDocCollector collector = TopScoreDocCollector.create(10);
            is.search(query, collector);

            ScoreDoc[] scoreDocs = collector.topDocs().scoreDocs;
            if(scoreDocs.length > 0) {
                int docID = scoreDocs[0].doc;
                Document doc = is.doc(docID);
                if (doc != null) {
                    for(IndexableField field : fields){
                        doc.removeFields(field.name());
                    }
                    for(IndexableField field: fields) {
                        doc.add(field);
                    }
                    try {
                        synchronized (this) {
                            this.indexWriter.updateDocument(new Term("filename", filename), doc);
                            this.indexWriter.commit();
                            return true;
                        }
                    } catch (IOException ioe){
                        return false;
                    }
                }
            }
            return false;
        } catch (IOException ioe) {
            throw new IllegalArgumentException("Index dir is wrong");
        }
    }

    public int index(File file) {
        DocumentHandler handler = null;
        String filename = null;
        try {
            File[] files;
            if (file.isDirectory()) {
                files = file.listFiles();
            } else {
                files = new File[1];
                files[0] = file;
            }
            for(File newFile : files){
                if(newFile.isFile()){
                    filename = newFile.getName();
                    handler = getHandler(filename);
                    if(handler == null){
                        System.out.println("Can't do it");
                        continue;

                    }
                    IndexUnit iu = handler.getIndexUnit(newFile);
                    Document doc = iu.getLuceneDocument();
                    this.indexWriter.addDocument(doc);
                } else if (newFile.isDirectory()) {
                    index(newFile);
                }
            }
            this.indexWriter.commit();
            System.out.println("Indexing complete");
        } catch (IOException ioe) {
            System.out.println("Indexing failed");
        }
        return this.indexWriter.numDocs();
    }

    public DocumentHandler getHandler(String filename){
        if(filename.endsWith(".txt")) {
            return new TextDocHandler();
        } else if(filename.endsWith(".pdf")){
            return new PDFHandler();
        } else {
            return null;
        }
    }

    protected void finalize() throws Throwable {
        this.indexWriter.close();
    }
}




















































