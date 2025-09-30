import { useLayoutEffect, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	FontFamiliesClasses,
	fontSizeOptions,
	fontColors,
	OptionType,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { Separator } from 'src/ui/separator';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export interface IParamsFormProps {
	fontFamily?: OptionType;
	fontSize?: OptionType;
	fontColor?: OptionType;
	backgroundColor?: OptionType;
	contentWidth?: OptionType;
}

type ArticleParamsFormProps = {
	onSubmit: (selectedValues: IParamsFormProps) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.({
			fontFamily: selectedFontFamily,
			fontSize: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBGColor,
			contentWidth: selectedContentWidthArr,
		});
	};

	const handleReset = () => {
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setSelectedBGColor(defaultArticleState.backgroundColor);
		setselectedContentWidthArr(defaultArticleState.contentWidth);
	};

	const [isOpen, setIsOpen] = useState(false);

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);

	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	const [selectedFontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);

	const [selectedBGColor, setSelectedBGColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);

	const [selectedContentWidthArr, setselectedContentWidthArr] =
		useState<OptionType>(defaultArticleState.contentWidth);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = () => {
		setIsOpen((open) => !open);
	};

	useLayoutEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const current = containerRef.current;
			if (current && !current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			{isOpen && (
				<aside
					ref={containerRef}
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text
							as={'h2'}
							size={31}
							weight={800}
							uppercase={true}
							align={'left'}
							family={
								defaultArticleState.fontFamilyOption
									.className as FontFamiliesClasses
							}>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							placeholder={
								selectedFontFamily
									? selectedFontFamily.title
									: defaultArticleState.fontFamilyOption.title
							}
							onChange={setSelectedFontFamily}
						/>
						<RadioGroup
							title='Размер шрифта'
							name={'radioButton'}
							options={fontSizeOptions}
							selected={selectedFontSize ?? defaultArticleState.fontSizeOption}
							onChange={setSelectedFontSize}
						/>
						<Select
							title='Цвет шрифта'
							selected={selectedFontColor}
							options={fontColors}
							placeholder={
								selectedFontColor
									? selectedFontColor.title && selectedFontColor.optionClassName
									: defaultArticleState.fontColor.title &&
									  defaultArticleState.fontColor.optionClassName
							}
							onChange={setFontColor}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={selectedBGColor}
							options={backgroundColors}
							placeholder={
								selectedBGColor
									? selectedBGColor.title && selectedFontColor.optionClassName
									: defaultArticleState.backgroundColor.title &&
									  defaultArticleState.backgroundColor.optionClassName
							}
							onChange={setSelectedBGColor}
						/>
						<Select
							title='Ширина контента'
							selected={selectedContentWidthArr}
							options={contentWidthArr}
							placeholder={
								selectedContentWidthArr
									? selectedContentWidthArr.title &&
									  selectedContentWidthArr.optionClassName
									: defaultArticleState.contentWidth.title &&
									  defaultArticleState.contentWidth.optionClassName
							}
							onChange={setselectedContentWidthArr}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' onClick={handleReset} type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
