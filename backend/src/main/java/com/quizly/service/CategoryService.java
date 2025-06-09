package com.quizly.service;

import java.util.Set;

import com.quizly.model.exam.Category;

public interface CategoryService {
	
	public Category addCategory(Category category);
	
	public Category updateCategory(Category category);
	
	public Set<Category> getCatagories();
	
	public Category getCategory(Long categoryId);
	
	public void deleteCategory(Long catgoryId); 

}
