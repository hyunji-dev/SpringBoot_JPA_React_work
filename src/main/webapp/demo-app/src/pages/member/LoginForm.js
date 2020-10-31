import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../../store';

const LoginForm = (props) => {

	const dispatch = useDispatch();

	const [member, setMember] = useState({
		email: '',
		password: ''
	});

	const changeValue = (e) => {
		setMember({
			...member,
			[e.target.name]: e.target.value
		});
		console.log(member);
	}

	const btnLogin = (e) => {
		e.preventDefault();

		fetch("http://localhost:8000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(member)
		}).then(res => {
			// 로컬 스토리지 저장
			for (let header of res.headers.entries()) {
				if (header[0] === "authorization") {
					localStorage.setItem("Authorization", header[1]);
				}
			}
			return res.text();
		}).then(res => {
			console.log("loginForm res: ", res);
			if (res === "ok") {
				// 로그인 상태 값 리덕스 저장
				dispatch(login());
				props.history.push("/");
			} else {
				alert('아이디 혹은 비번을 다시 입력하세요!');
			}
		});
	}
	
	return (
		<div>
			<form class="form-horizontal">
				<div class="form-group">
					<label class="control-label col-sm-2" for="email">Email:</label>
					<div class="col-sm-9">
						<input type="email" class="form-control" name="email" placeholder="Enter email" onChange={changeValue}/>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="pwd">Password:</label>
					<div class="col-sm-9">
						<input type="password" class="form-control" name="password" placeholder="Enter password" onChange={changeValue}/>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" class="btn btn-default" onClick={btnLogin}>Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;