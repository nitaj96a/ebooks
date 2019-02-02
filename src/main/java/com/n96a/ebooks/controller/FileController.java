package com.n96a.ebooks.controller;

import javax.servlet.http.HttpServletRequest;

import com.n96a.ebooks.lucene.model.IndexUnit;
import com.n96a.ebooks.lucene.indexing.Indexer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.n96a.ebooks.domain.Ebook;
import com.n96a.ebooks.service.EbookServiceInterface;
import com.n96a.ebooks.service.FileStorageService;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.ResourceBundle;

@RestController
public class FileController {

    //private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private EbookServiceInterface ebookService;

    @PostMapping("/api/ebooks/file")
    public ResponseEntity<String> uploadEbook(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.saveEbookFile(file);
        return new ResponseEntity<String>(fileName, HttpStatus.OK);
    }

    @GetMapping("/api/reindex")
    public ResponseEntity<String> index() throws IOException {
        File dataDir = fileStorageService.getEbookFilesLocation().toFile();
        long start = new Date().getTime();
        int numIndexed = Indexer.getInstance().index(dataDir);
        long end = new Date().getTime();

        String text = "Indexing " + numIndexed + " files took "
                + (end - start) + " milliseconds";

        return new ResponseEntity<String>(text, HttpStatus.OK);
    }

    @PostMapping(value = "/api/ebooks/{id}/file", params = {"id"})
    public ResponseEntity<String> uploadFileForEbook(@RequestParam("file") MultipartFile file, @PathVariable("id") Integer id) {
        String fileName = fileStorageService.saveEbookFile(file);
        Ebook ebook = ebookService.findOne(id);
        ebook.setFilename(fileName);
        ebook = ebookService.update(ebook);
        indexUploadedFile(fileName, ebook);
        return new ResponseEntity<String>(fileName, HttpStatus.OK);
    }

    @PostMapping("/api/ebooks/thumbnail")
    public ResponseEntity<String> uploadThumbnail(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.saveThumbnailFile(file);
        return new ResponseEntity<String>(fileName, HttpStatus.OK);
    }

    @GetMapping("/api/ebooks/{id}/file")
    public ResponseEntity<Resource> downloadEbook(@PathVariable("id") Integer id, HttpServletRequest request) {
        Ebook ebook = ebookService.findOne(id);
        Resource resource = fileStorageService.loadFileAsResource(ebook.getFilename());

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (Exception e) {
            //logger.info("Could not determine file type");
        }

        if (contentType == null) {
            contentType = ebook.getMIME();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, ebook.getMIME() + ";charset=utf-8")
                .body(resource);

    }

    public void indexUploadedFile(String fileName) {
        if(fileName != null){
            File file = fileStorageService.getFile(fileName);
            Ebook ebook = ebookService.findByFilename(fileName);
            IndexUnit indexUnit = Indexer.getInstance().getHandler(fileName).getIndexUnit(file);
            indexUnit.setTitle(ebook.getTitle());
            indexUnit.setKeywords(new ArrayList<String>(Arrays.asList(ebook.getKeywords().split(" "))));
            Indexer.getInstance().add(indexUnit.getLuceneDocument());
        }
    }

    public void indexUploadedFile(String fileName, Ebook ebook) {
        if(fileName != null){
            File file = fileStorageService.getFile(fileName);
            IndexUnit indexUnit = Indexer.getInstance().getHandler(fileName).getIndexUnit(file);
            indexUnit.setTitle(ebook.getTitle());
            indexUnit.setKeywords(new ArrayList<String>(Arrays.asList(ebook.getKeywords().split(" "))));
            Indexer.getInstance().add(indexUnit.getLuceneDocument());
        }
    }
}
