package com.cos.jwt.web;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.jwt.domain.member.Member;
import com.cos.jwt.domain.member.MemberRepository;
import com.cos.jwt.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberController {
	
	private final MemberRepository memberRepository;
	private final MemberService memberService;
	private final HttpSession session;
	
	// (1) 로그인 -  필터에 등록함.
	
	// (2) 회원가입
	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody Member member) {
		memberRepository.save(member);
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	
	// (3) 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout() {
		session.invalidate();
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	
	// 회원정보수정 // JWT 토큰으로 동일인 체크 후 접근 가능
	@PutMapping("/member")
	public ResponseEntity<?> update(@RequestBody Member member){
		Member memberEntity = (Member) session.getAttribute("principal");
		return memberService.updateMember(member, memberEntity.getId());
			
	}
	
}
