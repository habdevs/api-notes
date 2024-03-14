'use client';
import Logo from '@/shared/ui/logo/logo';

interface props {}

export const Header = ({ ...props }: props) => {
	return (
		<header className='bg-primary text-white py-4 px-6 flex items-center justify-between'>
			<div className='flex items-center'>
				<Logo />
				<span className='text-lg font-semibold'>admin-page</span>{' '}
			</div>

			<nav>
				<ul className='flex items-center space-x-4'>
					<li>
						<a href='#' className='hover:text-gray-300'>
							About
						</a>
					</li>
					<li>
						<a href='#' className='hover:text-gray-300'>
							Services
						</a>
					</li>
					<li>
						<a href='#' className='hover:text-gray-300'>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};
