package com.quizly.service;

import java.util.Set;

import com.quizly.model.exam.Question;
import com.quizly.model.exam.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	
	public Question updateQuestion(Question question);
	
	public Set<Question> getQuestions();
	
	public Question getQuestion(Long questionId);
	
	public void deleteQuestion(Long quesId);
	
	public Set<Question> getQuestionsOfQuiz(Quiz quiz);
	
	public Question get(Long questionsId);

}
