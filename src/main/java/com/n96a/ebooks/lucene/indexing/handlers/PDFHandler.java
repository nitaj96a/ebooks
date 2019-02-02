package com.n96a.ebooks.lucene.indexing.handlers;

import com.n96a.ebooks.lucene.model.IndexUnit;
import org.apache.lucene.document.DateTools;
import org.apache.pdfbox.io.RandomAccessFile;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class PDFHandler extends DocumentHandler {

    @Override
    public IndexUnit getIndexUnit(File file) {
        IndexUnit indexUnit = new IndexUnit();
        try {
            PDFParser parser = new PDFParser(new RandomAccessFile(file, "r"));
            parser.parse();
            String text = getText(parser);
            indexUnit.setText(text);

            // metadata stuff

                PDDocument pdf = parser.getPDDocument();

            PDDocumentInformation info = pdf.getDocumentInformation();

            String title = ""+ info.getTitle();
            indexUnit.setTitle(title);

            String keywords = ""+ info.getKeywords();
            if(keywords != null){
                String[] splitKeywords = keywords.split(" ");
                indexUnit.setKeywords(new ArrayList<String>(Arrays.asList(splitKeywords)));
            }

            indexUnit.setFilename(file.getCanonicalPath());



            String modificationDate = DateTools.dateToString(new Date(file.lastModified()), DateTools.Resolution.DAY);
            indexUnit.setFiledate(modificationDate);

            pdf.close();
        } catch (IOException ioe) {
            System.out.println("Error ");
        }
        return indexUnit;
    }

    public String getText(File file){
        try {
            PDFParser parser = new PDFParser(new RandomAccessFile(file, "r"));
            parser.parse();
            PDFTextStripper textStripper = new PDFTextStripper();
            String text = textStripper.getText(parser.getPDDocument());
            return text;
        } catch (IOException e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    public PDDocument getPDDocumentFromFile(File file){
        try {
            return PDDocument.load(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getText(PDFParser parser) {
        try {
            PDFTextStripper textStripper = new PDFTextStripper();
            String text = textStripper.getText(parser.getPDDocument());
            return text;
        } catch (IOException ioe){
            ioe.printStackTrace();
        }
        return null;
    }

    public String getTitle(File file){
        try {
            PDDocument doc = PDDocument.load(file);
            PDDocumentInformation info = doc.getDocumentInformation();
            return info.getTitle();
        } catch (InvalidPasswordException ipe) {
            ipe.printStackTrace();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public String getTitle(PDDocument doc) {
        return doc.getDocumentInformation().getTitle();
    }

    public String getAuthor(PDDocument doc) {
        return doc.getDocumentInformation().getAuthor();
    }
}
