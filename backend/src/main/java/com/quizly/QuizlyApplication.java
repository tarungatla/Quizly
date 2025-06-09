package com.quizly;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.quizly.model.Role;
import com.quizly.model.User;
import com.quizly.model.UserRole;
import com.quizly.service.UserService;

@SpringBootApplication
public class QuizlyApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(QuizlyApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {


			System.out.println("starting code...");

			// creating user object

			User user = new User();
			user.setFirstName("Tarunkumar");
			user.setLastName("Gatla");
			user.setUsername("tarun_gatla");
			user.setPassword(this.bCryptPasswordEncoder.encode("abc"));
			user.setEmail("tarungatla75@email.com");
			user.setProfile("default.png");

			Role role = new Role();

			role.setRoleId(46L);
			role.setRoleName("ADMIN");

			Set<UserRole> userRoleset = new HashSet<>();

			UserRole userRole = new UserRole();
			userRole.setRole(role);
			userRole.setUser(user);

			userRoleset.add(userRole);

//			User user1 = this.userService.createUser(user, userRoleset);
//			System.out.println(user1.getUsername());



	}
}
