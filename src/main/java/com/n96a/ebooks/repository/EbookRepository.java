package com.n96a.ebooks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.n96a.ebooks.domain.Ebook;

public interface EbookRepository extends JpaRepository<Ebook, Integer> {

}
