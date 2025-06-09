package com.quizly.service.implement;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizly.helper.UserFoundException;
import com.quizly.model.User;
import com.quizly.model.UserRole;
import com.quizly.repo.RoleRepository;
import com.quizly.repo.UserRepository;
import com.quizly.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	
	public UserServiceImpl() {
		
	}

	// creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception{
	

        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null) {
            System.out.println("User is already there !!");
            throw new UserFoundException();
        } else {
            //user create
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);

        }

        return local;
    }

	//getting user by username
	@Override
	public User getUser(String username) {
		
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
		
	}

}
