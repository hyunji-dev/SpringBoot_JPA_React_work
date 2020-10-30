package com.cos.jwt.config.jwt;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.cos.jwt.domain.member.Member;
import com.cos.jwt.domain.member.MemberRepository;

public class JwtAuthorizationFilter implements Filter {

	private MemberRepository memberRepository;

	public JwtAuthorizationFilter(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("JwtAuthorizationFilter 작동");

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		String jwtToken = req.getHeader(JwtProps.header);

		if (jwtToken == null) {
			PrintWriter out = resp.getWriter();
			out.print("jwtToken not found");
			out.flush();
		} else {
			jwtToken = jwtToken.replace(JwtProps.auth, "");

			try {
				int memberId = JWT.require(Algorithm.HMAC512(JwtProps.secret)).build().verify(jwtToken).getClaim("id").asInt();
				HttpSession session = req.getSession();
				Member memberEntity = memberRepository.findById(memberId).get();
				//select * from member where id=로그인할때, 토큰발급 받을 때 사용한 아이디;
				//재현이라는 유저가 
				session.setAttribute("principal", memberEntity);
				
				chain.doFilter(request, response);
			} catch (Exception e) {
				PrintWriter out = resp.getWriter();
				out.print("verify fail");
				out.flush();
			}
		}
	}
}
