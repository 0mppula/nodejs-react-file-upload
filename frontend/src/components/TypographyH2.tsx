import React from 'react';

interface TypographyH2Props {
	children: React.ReactNode;
}

const TypographyH2 = ({ children }: TypographyH2Props) => {
	return (
		<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
			{children}
		</h2>
	);
};

export default TypographyH2;
