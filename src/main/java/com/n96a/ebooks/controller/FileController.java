package com.n96a.ebooks.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

@RestController
public class FileController {

	//private static final Logger logger = LoggerFactory.getLogger(FileController.class);
	
	@Autowired
	private FileStorageService fileStorageService;
	
	@Autowired
	private EbookServiceInterface ebookService;
	
	@PostMapping("/api/ebooks/file")
	public ResponseEntity<String> uploadEbook(@RequestParam("file") MultipartFile file) {
		String fileName =  fileStorageService.saveEbookFile(file);
		return new ResponseEntity<String>(fileName, HttpStatus.OK);
	}
	
	@PostMapping("/api/ebooks/thumbnail")
	public ResponseEntity<String> uploadThumbnail(@RequestParam("file") MultipartFile file) {
		String fileName = fileStorageService.saveThumbnailFile(file);
		return new ResponseEntity<String>(fileName, HttpStatus.OK);
	}
	
	@GetMapping("/api/ebooks/{id}/file")
	public ResponseEntity<Resource> downloadEbook(@PathVariable("id") Integer id, HttpServletRequest request){
		Ebook ebook = ebookService.findOne(id);
		Resource resource = fileStorageService.loadFileAsResource(ebook.getFilename());
		
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (Exception e) {
			//logger.info("Could not determine file type");
		}
		
		if(contentType == null) {
			contentType = ebook.getMIME();
		}
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename()+ "\"")
				.header(HttpHeaders.CONTENT_TYPE, ebook.getMIME() +";charset=utf-8")
				.body(resource);
		
	}
	
}
