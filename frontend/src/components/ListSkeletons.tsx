import { Skeleton } from './ui/skeleton';

interface ListSkeletonsProps {
	count?: number;
}

const ListSkeletons = ({ count = 4 }: ListSkeletonsProps) => {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<Skeleton key={i + 'skeleton'} className="h-[228px] rounded-xl" />
			))}
		</>
	);
};

export default ListSkeletons;
