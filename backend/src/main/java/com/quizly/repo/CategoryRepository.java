package com.quizly.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizly.model.exam.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
