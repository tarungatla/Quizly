package com.quizly.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizly.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	

}
