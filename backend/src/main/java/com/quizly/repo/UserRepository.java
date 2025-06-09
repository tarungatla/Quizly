package com.quizly.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quizly.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	public  User findByUsername(String username);
}
