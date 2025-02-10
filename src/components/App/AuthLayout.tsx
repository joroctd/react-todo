import { FC } from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import AppAuthenticated from './AppAuthenticated';

interface AuthLayoutProps {
	children: React.ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	return (
		<>
			<SignedIn>
				<AppAuthenticated />
			</SignedIn>
			<SignedOut>
				<div className='container'>
					<div className='sidebar'>{children}</div>
					<div className='cover'></div>
				</div>
			</SignedOut>
		</>
	);
};

export default AuthLayout;
