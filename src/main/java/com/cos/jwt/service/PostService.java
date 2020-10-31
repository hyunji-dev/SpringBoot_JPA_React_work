package com.cos.jwt.service;

import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.cos.jwt.domain.member.Member;
import com.cos.jwt.domain.post.Post;
import com.cos.jwt.domain.post.PostRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {
	private final PostRepository postRepository;

	@Transactional
	public void postWrite(Post post, Member principal) {
		post.setMember(principal);
		postRepository.save(post);
	}
	
	@Transactional(readOnly = true)
	public Page<Post> postList(Pageable pageable) {
		return postRepository.findAll(pageable);
	}
	
	@Transactional(readOnly = true)
	public Post postDetail(int id) {
		return postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
	}
	
	@Transactional
	public int postUpdate(Post post, int id, Member principal) {
		Post postEntity = postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		
		if(postEntity.getMember().getId() == principal.getId()) {
			postEntity.setTitle(post.getTitle());
			postEntity.setContent(post.getContent());
			return 1;
		}else {
			return 0;
		}
	}
	
	@Transactional
	public int postDelete(int id, Member principal) {
		// 동일인 체크
		Post postEntity = postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException(id+"는 존재하지 않습니다."));
		if(postEntity.getMember().getId() == principal.getId()) {
			postRepository.deleteById(id);
			return 1;
		}else {
			return 0;
		}
	}
}
