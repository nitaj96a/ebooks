package com.n96a.ebooks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.n96a.ebooks.domain.Ebook;
import com.n96a.ebooks.domain.User;
import com.n96a.ebooks.repository.EbookRepository;

@Service
public class EbookService implements EbookServiceInterface {

	@Autowired
	EbookRepository ebookRepository;

	@Override
	public List<Ebook> findAll() {
		return ebookRepository.findAll();
	}

	@Override
	public Ebook findOne(Integer id) {
		return ebookRepository.getOne(id);
	}

	@Override
	public Ebook create(Ebook ebook) {
		Ebook savedEbook = ebookRepository.save(ebook);
		return savedEbook;
	}
	
	@Override
	public void remove(Integer id) {
		ebookRepository.deleteById(id);
	}

	@Override
	public List<Ebook> findByUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Ebook update(Ebook ebook) {
		Ebook savedEbook = ebookRepository.save(ebook);
		return savedEbook;
	}

	@Override
	public Ebook partialUpdate(Ebook ebook) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	
}
