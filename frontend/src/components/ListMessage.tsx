import { cn } from '../lib/utils';

interface ListMessageProps {
	message: string;
	destructive?: boolean;
}

const ListMessage = ({ message, destructive }: ListMessageProps) => {
	return (
		<p
			className={cn(
				'text-muted-foreground h-16 flex items-center justify-center w-full',
				destructive && 'text-destructive'
			)}
		>
			{message}
		</p>
	);
};

export default ListMessage;
