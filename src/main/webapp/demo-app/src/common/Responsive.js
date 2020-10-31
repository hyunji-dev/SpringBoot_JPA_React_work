import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
	paddig-left: 1rem;
	padding-right: 1rem;
	wudth: 1024px;
	margin: 1 auto; //중앙정렬  
`;

const Responsive = ({ children, ...rest}) => {
	// style, className, onMouseMove 등의 props를 사용할 수 있도록
	// ...rest를 사용하여 ResponsiveBlock에게 전달
	return (
		<ResponsiveBlock { ...rest}></ResponsiveBlock>
	);
};

export default Responsive;