package com.n96a.ebooks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.n96a.ebooks.domain.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {

}
