package com.cos.jwt.domain.member;

import java.sql.Timestamp;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // id -> bno -> id 
	
	@Column(unique = true)
	private String email; // username -> id -> email 
	
	private String password; 
	private String tel;
	private String name;
	
	//디폴트2 
	private int fCount;
	
	// 디폴트N 
	private String useChk; 
	
	@CreationTimestamp // 데이터 입력 시 자동으로 now()값이 들어감 
	private Timestamp rgstDt;
	
//	public String getRgstDt() {
//		// 방법1.
//		return rgstDt.toString().substring(0, 10);
//		
//		// 방법2. 여기서 import 시 왜 오류?
//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//		return df.format(rgstDt);
//	}
	
	
	
}
