import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Image, Loader, Video } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const API_URL = import.meta.env.VITE_API_URL;

const postImage = async (file: File) => {
	const formData = new FormData();
	formData.append('image', file);

	return axios.post(`${API_URL}/image`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

const postVideo = async (file: File) => {
	const formData = new FormData();
	formData.append('video', file);

	return axios.post(`${API_URL}/video`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

const UploadCards = () => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [videoFile, setVideoFile] = useState<File | null>(null);

	const queryClient = useQueryClient();

	const imageMutation = useMutation({
		mutationFn: postImage,
		onMutate: async (file) => {
			await queryClient.cancelQueries({ queryKey: ['images'] });

			// Snapshot previous images
			const previousImages = queryClient.getQueryData<string[]>(['images']);

			// Optimistically update with temp URL
			const tempUrl = URL.createObjectURL(file);
			queryClient.setQueryData<string[]>(['images'], (old) => [...(old || []), tempUrl]);

			return { previousImages };
		},
		onError: (err, _, context) => {
			toast.error('Image upload failed, please try again.');

			if (context?.previousImages) {
				// Rollback to previous images
				queryClient.setQueryData(['images'], context.previousImages);
			}
		},
		onSuccess: (data) => {
			toast.success('Image uploaded successfully!');

			// Replace temp URL with actual URL from server
			queryClient.setQueryData<string[]>(['images'], (old) =>
				old
					? // @ts-ignore
					  [...old.slice(0, -1), data.url]
					: // @ts-ignore
					  [data.url]
			);

			setImageFile(null);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['images'] });
		},
	});

	const videoMutation = useMutation({
		mutationFn: postVideo,
		onMutate: async (file) => {
			await queryClient.cancelQueries({ queryKey: ['videos'] });

			// Snapshot previous videos
			const previousVideos = queryClient.getQueryData<string[]>(['videos']);

			// Optimistically update with temp URL
			const tempUrl = URL.createObjectURL(file);
			queryClient.setQueryData<string[]>(['videos'], (old) => [...(old || []), tempUrl]);

			return { previousVideos };
		},
		onError: (err, _, context) => {
			toast.error('Video upload failed, please try again.');

			if (context?.previousVideos) {
				// Rollback to previous videos
				queryClient.setQueryData(['videos'], context.previousVideos);
			}
		},
		onSuccess: (data) => {
			toast.success('Video uploaded successfully!');

			// Replace temp URL with actual URL from server
			queryClient.setQueryData<string[]>(['videos'], (old) =>
				old
					? // @ts-ignore
					  [...old.slice(0, -1), data.url]
					: // @ts-ignore
					  [data.url]
			);

			setVideoFile(null);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['videos'] });
		},
	});

	const handleFileInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: 'image' | 'video'
	) => {
		if (e.target.files && e.target.files[0]) {
			if (type === 'image') {
				setImageFile(e.target.files[0]);
			} else {
				setVideoFile(e.target.files[0]);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent, mode: 'image' | 'video') => {
		e.preventDefault();

		if (mode === 'image' && imageFile) {
			imageMutation.mutate(imageFile);
		} else if (mode === 'video' && videoFile) {
			videoMutation.mutate(videoFile);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full mb-6">
			<form className="grid grid-cols-1 gap-4 w-full">
				{/* Image Upload Card */}
				<label
					tabIndex={0}
					htmlFor="imageInput"
					className="border-2 border-dashed p-6 flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl h-[228px]"
				>
					<input
						tabIndex={-1}
						id="imageInput"
						type="file"
						accept=".png,.jpg,.jpeg"
						className="sr-only"
						onChange={(e) => handleFileInputChange(e, 'image')}
					/>

					<div className="flex flex-col items-center justify-center space-y-4 w-full">
						<Image className="size-8 text-muted-foreground" />

						<p className="text-muted-foreground truncate w-full text-center">
							{imageFile ? imageFile.name : 'Attach an Image'}
						</p>
					</div>
				</label>

				<Button
					disabled={!imageFile || imageMutation.status === 'pending'}
					type="submit"
					onClick={(e) => handleSubmit(e, 'image')}
				>
					{imageMutation.status === 'pending' ? (
						<Loader className="animate-spin" />
					) : (
						'Upload'
					)}
				</Button>
			</form>

			<form className="grid grid-cols-1 gap-4 w-full">
				{/* Video Upload Card */}
				<label
					tabIndex={0}
					htmlFor="videoInput"
					className="border-2 border-border border-dashed p-6 flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl h-[228px]"
				>
					<input
						tabIndex={-1}
						id="videoInput"
						type="file"
						accept=".mp4,.mov,.mkv"
						className="sr-only"
						onChange={(e) => handleFileInputChange(e, 'video')}
					/>

					<div className="flex flex-col items-center justify-center space-y-4 w-full">
						<Video className="size-8 text-muted-foreground" />

						<p className="text-muted-foreground truncate w-full text-center">
							{videoFile ? videoFile.name : 'Attach a Video'}
						</p>
					</div>
				</label>

				<Button
					disabled={!videoFile || videoMutation.status === 'pending'}
					type="submit"
					onClick={(e) => handleSubmit(e, 'video')}
				>
					{videoMutation.status === 'pending' ? (
						<Loader className="animate-spin" />
					) : (
						'Upload'
					)}
				</Button>
			</form>
		</div>
	);
};

export default UploadCards;
