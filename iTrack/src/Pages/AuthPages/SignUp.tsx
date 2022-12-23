import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import { auth } from '../../Config/firebase';
import { createUserDatabaseEntry } from '../../Functions/createUserDatabaseEntry';

type Props = {};

const SignUp = (props: Props) => {
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const [password, setPassword] = useState('');
	const [userName, setuserName] = useState('');
	const [email, setEmail] = useState('');

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
		</div>
	);
};

export default SignUp;
