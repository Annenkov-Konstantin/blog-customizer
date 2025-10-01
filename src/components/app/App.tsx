import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article/Article';
import {
	ArticleParamsForm,
	IParamsFormProps,
} from 'src/components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
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
		<main className={styles.main} style={style}>
			<ArticleParamsForm onSubmit={handleParamsSubmit} />
			<Article />
		</main>
	);
};
