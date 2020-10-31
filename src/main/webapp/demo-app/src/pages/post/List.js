import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import PostItem from '../../components/PostItem';

const List = (props) => {
	const [posts, setPosts] = useState([]);
	const [last, setLast] = useState('');
	const [page, setPage] = useState(0);

	useEffect(() => {
		fetch("http://localhost:8000?page="+page, {
			method: "GET"
		}).then(res => res.json())
		.then(res => {
			console.log(res);
			setPosts(res.content);
			setLast(res.last);
		});
	}, [page]);

	const prev = () =>{
		setPage(page-1);
	}

	const next = () =>{
		setPage(page+1);
	}
	
	const btnWrite = (e) => {
		e.preventDefault();

		// props.history.push("/writeForm");
		props.history.push("/saveForm");
	}

	return (
		<div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="button" class="btn btn-default" onClick={btnWrite}>Write</button>
				</div>
			</div>

			{posts.map(post => <PostItem key={post.id} id={post.id} title={post.title} />)}
			<br />
			<div className="d-flex justify-content-center">
				<Pagination>
					{page === 0 ? 
						<Pagination.Item onClick={prev} disabled>Prev</Pagination.Item> : 
						<Pagination.Item onClick={prev}>Prev</Pagination.Item>}
					{last === true ? 
						<Pagination.Item onClick={next} disabled>Next</Pagination.Item> : 
						<Pagination.Item onClick={next}>Next</Pagination.Item>}
				</Pagination>
			</div>
		</div>
	);
};

export default List;