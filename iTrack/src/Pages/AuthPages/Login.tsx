import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import { auth } from '../../Config/firebase';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {};

const Login = (props: Props) => {
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	if (error) {
		return (
			<div>
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="AuthPage">
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={() => signInWithEmailAndPassword(email, password)}>
				Sign In
			</button>

			<a style={{ textAlign: 'center' }} onClick={() => navigate('/signup')}>
				Create An Account
			</a>
		</div>
	);
};

export default Login;
