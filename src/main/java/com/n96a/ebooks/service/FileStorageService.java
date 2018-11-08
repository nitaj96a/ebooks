package com.n96a.ebooks.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.n96a.ebooks.properties.FileStorageProperties;

@Service
public class FileStorageService {

	private final Path ebookFilesLocation;
	private final Path thumbnailFilesLocation;
	
	@Autowired
	public FileStorageService(FileStorageProperties fileStorageProperties) {
		this.ebookFilesLocation = Paths.get(fileStorageProperties.getEbooksDir()).toAbsolutePath().normalize();
		this.thumbnailFilesLocation = Paths.get(fileStorageProperties.getThumbnailsDir()).toAbsolutePath().normalize();
		
		try {
			//System.out.println("Trying to create folders");
            Files.createDirectories(this.ebookFilesLocation);
            Files.createDirectories(this.thumbnailFilesLocation);
            //System.out.println("created folders");
        } catch (Exception e) {
			//System.out.println("Failed to create folders!");
		}
	}
	
	public String saveEbookFile(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Path targetLocation = this.ebookFilesLocation.resolve(fileName);
		try {
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return fileName;
		} catch (IOException e) {
			e.printStackTrace();
			return ""; // better handle the exception
		}	
	}
	
	// put some compression and resizing in here ?
	public String saveThumbnailFile(MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Path targetLocation = this.thumbnailFilesLocation.resolve(fileName);
		try {
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return fileName;
		} catch (IOException e) {
			e.printStackTrace();
			return ""; // better handle the exception
		}	
	}
	
	//thumbnails can be downloaded anyway by right-clicking in the browser
	public Resource loadFileAsResource(String fileName) {
		try {
			Path filePath = this.ebookFilesLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				//throw some exception
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null; // get rid of this...
	}
}
