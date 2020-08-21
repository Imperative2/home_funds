package utils.validation;

import com.masluch.backend.entities.User;



public class UserValidation {
	
	private final static String UNSAFE_CHARACTERS = "[_,\\\\,/,',\",`,\\[,\\],\\{,\\},*,%,(,),^,$,#]+";
	private final static String SAFE_COLORS = "^#[a-f,0-9]{6}$";
	private final static String SAFE_EMAIL = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
	
	public static boolean checkIfRegisterDataValid(User newUser) {
			boolean isDataValid = true;
			
			isDataValid &= checkIfEmailValid(newUser.getEmail());
			isDataValid &= checkIfNameValid(newUser.getName());
			isDataValid &= checkIfSurnameValid(newUser.getSurname());
			isDataValid &= checkIfNicknameValid(newUser.getNickname());
			isDataValid &= checkIfPasswordValid(newUser.getPassword());
			isDataValid &= checkIfColorValid(newUser.getColor());
			
			return isDataValid;
					
	};
	
	public static boolean checkIfEmailValid(String email) {
		if(email.matches(SAFE_EMAIL) == true)
			return true;
		else 
			return false;
	}
	
	public static boolean checkIfNameValid(String name) {
		
		
		System.out.println(name+" ______ checking regex_______  "+name.matches(UNSAFE_CHARACTERS));
		
		if(name != null && name.length() <3 && name.length() <=50 )
			return false;
		if(name.matches(UNSAFE_CHARACTERS)) {
			return false;
		}
		
		return true;
	}
	
	public static boolean checkIfSurnameValid(String surname) {
		if(surname != null && surname.length() <3 && surname.length() <=50 )
			return false;
		if(surname.matches(UNSAFE_CHARACTERS)) {
			return false;
		}
		return true;
	}
	
	public static boolean checkIfNicknameValid(String nickname) {
		if(nickname != null && nickname.length() <3 && nickname.length() <=50 )
			return false;
		if(nickname.matches(UNSAFE_CHARACTERS)) {
			return false;
		}
		return true;
	}
	
	public static boolean checkIfPasswordValid(String password) {
		return true;
	}
	
	public static boolean checkIfColorValid(String color) {
		
		if(color.matches(SAFE_COLORS) == true)
			return true;
		else 
			return false;
	}

}
