import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import { auth } from '../../Config/firebase';
import { createUserDatabaseEntry } from '../../Functions/createUserDatabaseEntry';
import { useNavigate } from 'react-router-dom';

type Props = {};

const SignUp = (props: Props) => {
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const [password, setPassword] = useState('');
	const [userName, setuserName] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const CreateAccount = async () => {
		const NewUser = await createUserWithEmailAndPassword(email, password);
		await createUserDatabaseEntry(userName, NewUser);
	};

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
				type="text"
				value={userName}
				placeholder="Username"
				onChange={(e) => setuserName(e.target.value)}
			/>
			<input
				type="email"
				value={email}
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				value={password}
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={CreateAccount}>Register</button>
			<a style={{ textAlign: 'center' }} onClick={() => navigate('/login')}>
				Already have an account?
			</a>
		</div>
	);
};

export default SignUp;
