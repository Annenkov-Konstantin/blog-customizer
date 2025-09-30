import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	IParamsFormProps,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const cssVars: CSSProperties & { [key: `--${string}`]: string } = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const [style, setStyle] = useState(cssVars);

	const handleParamsSubmit = (values: IParamsFormProps) => {
		setStyle({
			'--font-family': values.fontFamily?.value ?? '',
			'--font-size': values.fontSize?.value ?? '',
			'--font-color': values.fontColor?.value ?? '',
			'--container-width': values.contentWidth?.value ?? '',
			'--bg-color': values.backgroundColor?.value ?? '',
		});
	};

	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm onSubmit={handleParamsSubmit} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
