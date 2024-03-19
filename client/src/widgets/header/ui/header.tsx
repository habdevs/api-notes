'use client';
import Logo from '@/shared/ui/logo';

interface props {}

export const Header = ({ ...props }: props) => {
	return (
		<header className='bg-primary text-white py-4 px-6 flex items-center justify-between'>
			<div className='flex items-center'>
				<Logo />
				<span className='text-lg font-semibold lg:flex hidden'>
					habdev-admin
				</span>{' '}
			</div>

			<nav>
				<ul className='flex items-center space-x-4'>
					<li>
						<a href='/create' className='hover:text-gray-300'>
							Create
						</a>
					</li>
					<li>
						<a href='/login' className='hover:text-gray-300'>
							Login
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
