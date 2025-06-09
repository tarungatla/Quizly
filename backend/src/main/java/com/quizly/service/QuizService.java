package com.quizly.service;

import java.util.List;
import java.util.Set;

import com.quizly.model.exam.Category;
import com.quizly.model.exam.Quiz;

public interface QuizService {
	public Quiz addQuiz(Quiz quiz);
	
	public Quiz updateQuiz(Quiz quiz);
	
	public Set<Quiz> getQuizes();
	
	public Quiz getQuiz(Long quizId);
	
	public void deleteQuiz(Long quizId);

	public List<Quiz> getQuizesOfCategory(Category category);
	
	public List<Quiz> getActiveQuizes();
	
	public List<Quiz> getActiveQuizesOfCategory(Category c);

}
