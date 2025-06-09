package com.quizly.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizly.model.exam.Question;
import com.quizly.model.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	Set<Question> findByQuiz(Quiz quiz);
}
