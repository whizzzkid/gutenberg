/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import * as styles from '../styles';
import { useContextSystem, WordPressComponentProps } from '../../ui/context';
import { useCx } from '../../utils/hooks/use-cx';

import type { BorderControlProps } from '../types';

export function useBorderControl(
	props: WordPressComponentProps< BorderControlProps, 'div' >
) {
	const { className, isSmall, ...otherProps } = useContextSystem(
		props,
		'BorderControl'
	);

	// Generate class names.
	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.BorderControl, className );
	}, [ className ] );

	const innerWrapperClassName = useMemo( () => {
		const smallStyle = isSmall && styles.SmallWrapper;
		return cx( styles.InnerWrapper, smallStyle );
	}, [ isSmall ] );

	const widthControlClassName = useMemo( () => {
		return cx( styles.BorderWidthControl );
	}, [] );

	const sliderClassName = useMemo( () => {
		return cx( styles.BorderSlider );
	}, [] );

	return {
		...otherProps,
		className: classes,
		innerWrapperClassName,
		widthControlClassName,
		sliderClassName,
	};
}
