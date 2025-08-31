import { cn } from '../lib/utils';
import ListMessage from './ListMessage';
import ListSkeletons from './ListSkeletons';
import TypographyH2 from './TypographyH2';

interface VideosListProps {
	videos: string[] | undefined;
	isLoading: boolean;
	isError: Error | null;
}

const VideosList = ({ videos, isLoading, isError }: VideosListProps) => {
	return (
		<>
			<TypographyH2>Videos</TypographyH2>

			<div
				className={cn(
					'grid gap-4 md:gap-6 w-full mb-6',
					(isLoading || (videos && videos.length > 0)) && !isError
						? 'grid-cols-1 md:grid-cols-2'
						: 'grid-cols-1'
				)}
			>
				{isError ? (
					<ListMessage
						message="Failed to load videos. Please try again later."
						destructive
					/>
				) : isLoading ? (
					<ListSkeletons />
				) : videos && videos.length > 0 ? (
					videos.map((video, i) => (
						<video
							key={i}
							src={video}
							controls
							className="w-full h-[228px] object-cover rounded-xl"
						/>
					))
				) : (
					<ListMessage message="No videos uploaded yet." />
				)}
			</div>
		</>
	);
};

export default VideosList;
