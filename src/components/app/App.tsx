import { useState } from 'react';
import { TInitialState, initialState } from '../../constants/articleProps';
import clsx from 'clsx';
import { Article } from '../../components/article';
import {
	IParamsFormProps,
	ArticleParamsForm,
} from '../../components/article-params-form/ArticleParamsForm';
import '../../styles/index.scss';
import styles from './App.module.scss';

export const App = () => {
	const [style, setStyle] = useState<TInitialState>(initialState);

	const changeStyle = (values: IParamsFormProps) => {
		setStyle({
			'--font-family': values.fontFamily?.value ?? '',
			'--font-size': values.fontSize?.value ?? '',
			'--font-color': values.fontColor?.value ?? '',
			'--container-width': values.contentWidth?.value ?? '',
			'--bg-color': values.backgroundColor?.value ?? '',
		});
	};

	const resetStyle = () => {
		setStyle({ ...initialState });
	};

	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm changeStyle={changeStyle} resetStyle={resetStyle} />
			<Article />
		</main>
	);
};
