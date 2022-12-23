import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import { auth } from '../../Config/firebase';

type Props = {};

const Login = (props: Props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

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
		<div>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={() => signInWithEmailAndPassword(email, password)}>
				Sign In
			</button>
		</div>
	);
};

export default Login;
