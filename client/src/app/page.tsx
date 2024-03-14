'use client';
import { Button } from '@/shared/ui/button/button';
import { Header } from '@/widgets/header/ui/header';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div>
				<Button
					variant='primary'
					size='default'
					onClick={() => console.log('ok')}
				>
					Click me
				</Button>
			</div>
			<Header />
		</main>
	);
}
