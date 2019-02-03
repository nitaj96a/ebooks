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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.n96a.ebooks.domain.Ebook;
import com.n96a.ebooks.service.EbookServiceInterface;
import com.n96a.ebooks.service.FileStorageService;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController()
public class FileController {

    //private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private EbookServiceInterface ebookService;

//    @Autowired
//    private Indexer indexer;

    @CrossOrigin()
    @PostMapping(value = "/api/ebooks/file", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<String> uploadEbook(@RequestParam("file") MultipartFile file) {
        System.out.println("in uploadEbook");
        String fileName = fileStorageService.saveEbookFile(file);
        File savedFile = fileStorageService.getFile(fileName);
        long start = new Date().getTime();
        int numIndexed = Indexer.getInstance().index(savedFile);
        long end = new Date().getTime();

        return new ResponseEntity<String>(fileName, HttpStatus.OK);
    }

    @GetMapping("/api/reindex")
    public ResponseEntity<String> index() throws IOException {
        File dataDir = fileStorageService.getEbookFilesLocation().toFile();
        long start = new Date().getTime();
        int numIndexed = Indexer.getInstance().index(dataDir);
        //int numIndexed = indexer.getInstance().index(dataDir);
        long end = new Date().getTime();

        String text = "Indexing " + numIndexed + " files took "
                + (end - start) + " milliseconds";

        return new ResponseEntity<String>(text, HttpStatus.OK);
    }

    @PostMapping(value = "/api/ebooks/{id}/file")
    public ResponseEntity<String> uploadFileForEbook(@RequestBody MultipartFile file, @PathVariable("id") Integer id) {
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
