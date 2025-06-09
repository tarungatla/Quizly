package com.quizly.model;


import lombok.*;


@Setter
@Getter
@NoArgsConstructor
@ToString
public class JwtResponse {
	
	private String token;
	
	
	 public JwtResponse(String token) {
	        this.token = token;
	    }

	
}