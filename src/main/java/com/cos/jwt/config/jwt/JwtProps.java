package com.cos.jwt.config.jwt;
/*
 * 2020.10.22-2
 */
public interface JwtProps {
	// 인터페이스에서는 public static final 생략 가능 
	String secret = "비밀키";
	String auth = "Bearer ";
	String header = "Authorization";
}
