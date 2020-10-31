import React, { useState } from 'react';
// import styled from 'styled-components';


const SavaForm = (props) => {
	const [post, setPost] = useState({
		title: '',
		content: ''
	});

	const btnPost = (e) => {
		e.preventDefault();
		
		fetch("http://localhost:8000/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"Authorization": localStorage.getItem("Authorization")
			},
			body: JSON.stringify(post)
		}).then(res => {
			return res.text();
		}).then(res => {
			if (res === "ok") {
				props.history.push("/list");
			} else {
				alert('글등록 실패');
			}
		});
	}

	const changeValue = (e) => {

		setPost({
			...post,
			[e.target.name]: e.target.value
		});		
	}
	
	return (
		<div>
			<form class="form-horizontal">
				<div class="form-group">
					<label class="control-label col-sm-2" for="title">Title:</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" name="title" placeholder="Enter Title" onChange={changeValue}/>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="content">Content:</label>
					
					{/* 기본 텍스트에어리 */}
					<div class="col-sm-9" >
						<textarea class="form-control" rows="20" name="content" onChange={changeValue} >Enter Content</textarea>
					</div>

					{/* 퀼 적용 */}
					

					{/* 썸머노트: 아무것도 제대로 안먹힘 
					<ReactSummernote class="col-sm-9" name="content" onChange={changeValue}
						options={
									{
									height: 400,
									dialogsInBody: true,
									toolbar: [
										['style', ['style']],
										['font', ['bold', 'underline', 'clear']],
										['fontname', ['fontname']],
										['para', ['ul', 'ol', 'paragraph']],
										['table', ['table']],
										['insert', ['link', 'picture', 'video']],
										['view', ['fullscreen', 'codeview']]
									]
									}
									}>
					</ReactSummernote> */}
					
					
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" class="btn btn-default" onClick={btnPost}>Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SavaForm;