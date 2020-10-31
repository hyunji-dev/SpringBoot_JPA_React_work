import React, { useState } from 'react';

const JoinForm = (props) => {
	const [member, setMember] = useState({
		email: '',
		password: '',
		id: '',
		tel: '',
		name: ''
	});

	const changeValue = (e) => {
		setMember({
			...member,
			[e.target.name]: e.target.value
		});
		console.log(member);
	}

	const btnJoin = (e) => {
		e.preventDefault();
		
		// // 빈칸체크 및 비밀번호 일치체크 
		// if([email, password, tel, name].includes('')) {
		// 	alert("Please fill in all the blanks.");
		// 	return;
		// }
		// if(password !== passwordConfirm) {
		// 	alert("Passwords do not match.");
		// 	return;
		// }

		fetch("http://localhost:8000/join", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(member)
		}).then(res => {
			
			return res.text();
		}).then(res => {
			if (res === "ok") {
				props.history.push("/loginForm");
			} else {
				alert('회원가입 실패');
			}
		});
	}
	

	return (
		
		<form class="form-horizontal">
			<div class="form-group">
				<label class="control-label col-sm-2" for="email">Email:</label>
				<div class="col-sm-9">
					<input type="email" class="form-control" name="email" placeholder="Enter email" onChange={changeValue}/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="password">Password:</label>
				<div class="col-sm-9">
					<input type="password" class="form-control" name="password" placeholder="Enter password" onChange={changeValue}/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="password">Check:</label>
				
				<div class="col-sm-9">
					<input type="password" class="form-control" name="passwordConfirm" placeholder="Check password" onChange={changeValue}/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="tel">Tel:</label>
				<div class="col-sm-9">
					<input type="phone" class="form-control" name="tel" placeholder="Enter tel" onChange={changeValue}/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="name">Name:</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" name="name" placeholder="Enter name" onChange={changeValue}/>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-9">
					<button type="submit" class="btn btn-primary btn-block" onClick={btnJoin}>Submit</button>
				</div>
			</div>
		</form>
		
	);
};

export default JoinForm;