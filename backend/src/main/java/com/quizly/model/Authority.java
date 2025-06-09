package com.quizly.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority{
	String authority;
	

	public Authority(String authority) {
		this.authority = authority;
	}


	@Override
	public String getAuthority() {
		
		return this.authority;
	}

	
}
