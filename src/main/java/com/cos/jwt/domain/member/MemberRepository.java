package com.cos.jwt.domain.member;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
//	// NativeQuery
//	@Query(value = " SELECT * FROM MEMBER WHERE USECHK = 'N' ", nativeQuery = true)
//	Member mUseMember(); 
	
	Member findByEmailAndPassword(String email, String password);

}
