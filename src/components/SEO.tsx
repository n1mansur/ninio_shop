import React, { FC } from 'react';
import Head from 'next/head';
import favicon  from '@/../public/favicon.ico'
interface Props {
	title?: string
}

const SEO: FC<Props> = ({ title }) => {
	return (
		<Head>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1  maximum-scale=1, user-scalable=0'
			/>
			<meta charSet='utf-8' />
			<title>{title || 'ninio-shop'}</title>
			<link rel='icon' href={favicon.src} />
		</Head>
	);
};

export default SEO;
