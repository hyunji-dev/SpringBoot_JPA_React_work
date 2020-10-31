import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
	// 페이지 위아래 여백 지정 
	padding-top: 5rem;
	padding-bottom: 5rem;
`;

const TitleInput = styled.input`
	font-size: 3rem;
	outline: none;
	padding-bottom: 0.5rem;
	border: none;
	border-bottom: 1px solid gray;
	margin-bottom; 2rem;
	width: 100%;
`;

const QuillWrapper = styled.div`
	.ql-editor {
		padding: 0;
		min-height: 320px;
		font-size: 1.125rem;
		line-height: 1.5;
	}
	.pl-deitor.ql-blank::berore {
		left: 0px;
	}
`;
const Editor = () => {
	const quillElement = useRef(null); // 퀼을 적용할 divElement를 설정
	const quillInstance = useRef(null); //퀼 인스턴스 설정 

	useEffect(() => {
		quillInstance.current = new Quill(quillElement.current, {
			// theme: 'snow', 
			theme: 'buble',
			placeholder: "Enter Content...",
			modules: {
				toolbar: [
					['bold', 'italic', 'underline', 'strike'],        // toggled buttons
					['blockquote', 'code-block'],

					[{ 'header': 1 }, { 'header': 2 }],               // custom button values
					[{ 'list': 'ordered'}, { 'list': 'bullet' }],
					[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
					[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
					[{ 'direction': 'rtl' }],                         // text direction

					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{ 'font': [] }],
					[{ 'align': [] }],

					['clean']                                         // remove formatting button
				],
			},
		})
	}, []);

	return (
		<div>
			<QuillWrapper>
				<div ref={quillElement} />
			</QuillWrapper>
		</div>
	);
};

export default Editor;