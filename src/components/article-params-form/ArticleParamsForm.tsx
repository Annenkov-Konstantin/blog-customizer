import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useLayoutEffect, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { Select } from '../../ui/select';
import { Text } from '../../ui/text';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from '../../constants/articleProps';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator';

import styles from './ArticleParamsForm.module.scss';

export interface IParamsFormProps {
	fontFamily?: OptionType;
	fontSize?: OptionType;
	fontColor?: OptionType;
	backgroundColor?: OptionType;
	contentWidth?: OptionType;
}

interface IArticleParamsFormProps {
	changeStyle: (selectedValues: IParamsFormProps) => void;
	resetStyle: () => void;
}

export const ArticleParamsForm = ({
	changeStyle,
	resetStyle,
}: IArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);

	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);

	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor);

	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleArrowButton = () => {
		setIsFormOpen((isFormOpen) => !isFormOpen);
	};

	useLayoutEffect(() => {
		if (!isFormOpen) {
			return;
		}
		const clickOutside = (event: MouseEvent) => {
			const current = containerRef.current;
			if (current && !current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', clickOutside);

		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [isFormOpen]);

	const onChangeFont = (option: OptionType) => {
		setSelectedFont(option);
	};

	const onChangeFontSize = (option: OptionType) => {
		setSelectedFontSize(option);
	};

	const onChangeFontColor = (option: OptionType) => {
		setSelectedFontColor(option);
	};

	const onChangeBackgroundColor = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};

	const onChangeContentWidth = (option: OptionType) => {
		setSelectedContentWidth(option);
	};

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		changeStyle({
			fontFamily: selectedFont,
			fontSize: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
		});
	};

	const handleFormReset = useCallback(() => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		resetStyle();
	}, [resetStyle]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowButton} />
			<aside
				ref={containerRef}
				className={clsx(
					styles.container,
					isFormOpen ? styles.container_open : ''
				)}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						options={[...fontFamilyOptions]}
						placeholder={selectedFont.title}
						title='шрифт'
						onChange={onChangeFont}
					/>
					<RadioGroup
						name='fontSize'
						options={[...fontSizeOptions]}
						selected={selectedFontSize}
						onChange={onChangeFontSize}
						title='рАЗМЕР шрифта'
					/>
					<Select
						selected={selectedFontColor}
						options={[...fontColors]}
						placeholder={selectedFontColor.title}
						title='Цвет шрифта'
						onChange={onChangeFontColor}
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						options={[...backgroundColors]}
						placeholder={selectedBackgroundColor.title}
						title='Цвет фона'
						onChange={onChangeBackgroundColor}
					/>
					<Select
						selected={selectedContentWidth}
						options={[...contentWidthArr]}
						placeholder={selectedContentWidth.title}
						title='Ширина контента'
						onChange={onChangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={handleFormReset}
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
