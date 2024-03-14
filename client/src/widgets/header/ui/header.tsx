import { Button } from '@/shared/ui/button/button';

interface props {}

export const Header = ({ ...props }: props) => {
	return (
		<div className='flex items-center justify-between gap-4'>
			<div className='flex items-center gap-4'>
				<Button
					variant='primary'
					size='icon'
					className='w-8 h-8'
					onClick={() => console.log('HEADER')}
				>
					BTN HEADER
				</Button>
			</div>
		</div>
	);
};
