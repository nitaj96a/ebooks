package com.n96a.ebooks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.n96a.ebooks.domain.Ebook;
import com.n96a.ebooks.repository.EbookRepository;

@Service
public class EbookService implements EbookServiceInterface {

	@Autowired
	EbookRepository ebookRepository;

	@Override
	public List<Ebook> findAll() {
		return ebookRepository.findAll();
	}
	
	
}
