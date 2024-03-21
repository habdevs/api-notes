'use client';
import Auth from '@/widgets/auth/ui/auth';

export default function LoginPage() {
	return (
		<div className='flex flex-col items-center mx-auto justyfy-center p-12 overflow-y-hidden max-w-[84rem]'>
			<h1 className='text-2xl font-bold mb-4'>Login</h1>
			<Auth />
		</div>
	);
}
