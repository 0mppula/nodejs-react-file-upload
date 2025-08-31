import { cn } from '../lib/utils';
import ListMessage from './ListMessage';
import ListSkeletons from './ListSkeletons';
import TypographyH2 from './TypographyH2';

interface ImagesListProps {
	images: string[] | undefined;
	isLoading: boolean;
	isError: Error | null;
	isFetching: boolean;
}

const ImagesList = ({ images, isLoading, isError, isFetching }: ImagesListProps) => {
	const showSkeletons = isLoading || isFetching;

	return (
		<>
			<TypographyH2>Images</TypographyH2>

			<div
				className={cn(
					'grid gap-4 md:gap-6 w-full mb-6',
					(showSkeletons || (images && images.length > 0)) && !isError
						? 'grid-cols-1 md:grid-cols-2'
						: 'grid-cols-1'
				)}
			>
				{isError ? (
					<ListMessage
						message="Failed to load images. Please try again later."
						destructive
					/>
				) : showSkeletons ? (
					<ListSkeletons />
				) : images && images.length > 0 ? (
					images.map((image, i) => (
						<img
							key={i}
							src={image}
							alt={`Uploaded image ${i}`}
							className="w-full h-[228px] object-cover rounded-xl"
						/>
					))
				) : (
					<ListMessage message="No images uploaded yet." />
				)}
			</div>
		</>
	);
};

export default ImagesList;
