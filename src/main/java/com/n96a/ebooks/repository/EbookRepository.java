package com.n96a.ebooks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.n96a.ebooks.model.Ebook;

public interface EbookRepository extends JpaRepository<Ebook, Integer> {
    public Ebook findByFilename(String filename);
}
