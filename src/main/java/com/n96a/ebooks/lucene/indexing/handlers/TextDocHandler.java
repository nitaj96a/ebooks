package com.n96a.ebooks.lucene.indexing.handlers;

import com.n96a.ebooks.lucene.model.IndexUnit;
import org.apache.lucene.document.DateTools;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class TextDocHandler extends DocumentHandler {

    @Override
    public IndexUnit getIndexUnit(File file) {
        IndexUnit indexUnit = new IndexUnit();
        BufferedReader reader = null;
        try {
            FileInputStream fis = new FileInputStream(file);
            reader = new BufferedReader(new InputStreamReader(fis, "UTF8"));

            String firstLine = reader.readLine();

            indexUnit.setTitle(firstLine);
            // setLanguage ...

            String secondLine = reader.readLine();
            String [] keywords = secondLine.split(",");
            indexUnit.setKeywords(new ArrayList<String>(Arrays.asList(keywords)));

            String fullText = "";
            while (true) {
                secondLine = reader.readLine();
                if (secondLine == null) {
                    break;

                }
                fullText += " " +secondLine; // Use a string builder?
            }
            indexUnit.setText(fullText);
            indexUnit.setFilename(file.getCanonicalPath());

            String modificationDate = DateTools.dateToString(new Date(file.lastModified()), DateTools.Resolution.DAY);
            indexUnit.setFiledate(modificationDate);

            return indexUnit;
        } catch (FileNotFoundException fnfe) {
            throw new IllegalArgumentException("File doesn't exist");
        } catch (IOException ioe){
            throw new IllegalArgumentException("Error: file is bad");
        } finally {
            if (reader != null){
                try {
                    reader.close();
                } catch (IOException ioe) {
                    System.out.println("Couldn't close the reader");
                }
            }
        }
    }

    @Override
    public String getText(File file) {
        BufferedReader reader = null;
        try {
            FileInputStream fis = new FileInputStream(file);
            reader = new BufferedReader(new InputStreamReader(fis, "UTF8"));
            String secondLine;
            String fullText = "";
            while (true) {
                secondLine = reader.readLine();
                if (secondLine == null){
                    break;
                }
                fullText += " " + secondLine;
            }
            return fullText;
        } catch (FileNotFoundException fnfe) {
            fnfe.printStackTrace();
            throw new IllegalArgumentException("");
        } catch (IOException ioe) {
            throw new IllegalArgumentException("");
        } finally {
            if (reader != null)
                try {
                    reader.close();
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                }
        }
    }
}
