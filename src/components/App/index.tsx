import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import './App.css';
import AuthLayout from './AuthLayout';
import urls from '@/data/urls';

const App: FC = () => {
	return (
		<Routes>
			<Route
				path={urls.signUp}
				element={
					<AuthLayout>
						<SignUp signInUrl={urls.signIn} />
					</AuthLayout>
				}
			/>
			<Route
				path={urls.signIn}
				element={
					<AuthLayout>
						<SignIn
							routing='path'
							path={urls.signIn}
							signUpUrl={urls.signUp}
						/>
					</AuthLayout>
				}
			/>
			<Route
				path='*'
				element={
					<AuthLayout>
						<SignUp signInUrl={urls.signIn} />
					</AuthLayout>
				}
			/>
		</Routes>
	);
};

export default App;
