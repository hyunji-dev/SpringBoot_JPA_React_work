package com.cos.jwt.service;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.cos.jwt.domain.member.Member;
import com.cos.jwt.domain.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	@Transactional
	public ResponseEntity<?> updateMember(Member member, int id) {
		
		Member memberEntity = memberRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("는 존재하지 않습니다."));
		memberEntity.setName(member.getName());
		memberEntity.setId(member.getId());
		
//		if(memberEntity.getUser().getId() == principal.getId()) {
//			memberEntity.setTitle(post.getTitle());
//			memberEntity.setContent(post.getContent());
//			return 1;
//		}else {
//			return 0;
//		}
		return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
	}

}
