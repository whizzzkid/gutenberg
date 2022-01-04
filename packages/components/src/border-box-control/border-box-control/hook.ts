/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import * as styles from '../styles';
import { hasMixedBorders } from '../utils';
import { useContextSystem, WordPressComponentProps } from '../../ui/context';
import { useCx } from '../../utils/hooks/use-cx';

import type { Border } from '../../border-control/types';
import type { BordersKey, BorderBoxControlProps } from '../types';

export function useBorderBoxControl(
	props: WordPressComponentProps< BorderBoxControlProps, 'div' >
) {
	const { className, onChange, value, ...otherProps } = useContextSystem(
		props,
		'BorderBoxControl'
	);

	const mixedBorders = hasMixedBorders( value );
	const [ isLinked, setIsLinked ] = useState( ! mixedBorders );
	const toggleLinked = () => setIsLinked( ! isLinked );

	const onLinkedChange = ( newBorder: Border | undefined ) => {
		if ( ! newBorder ) {
			onChange( undefined );
		}

		onChange( {
			top: newBorder,
			right: newBorder,
			bottom: newBorder,
			left: newBorder,
		} );
	};

	const onSplitChange = (
		newBorder: Border | undefined,
		side: BordersKey
	) => {
		onChange?.( {
			...value,
			[ side ]: newBorder,
		} );
	};

	const cx = useCx();
	const classes = useMemo( () => {
		return cx( styles.BorderBoxControl, className );
	}, [ className ] );

	const linkedControlClassName = useMemo( () => {
		return cx( styles.LinkedBorderControl );
	}, [] );

	return {
		...otherProps,
		className: classes,
		hasMixedBorders: mixedBorders,
		isLinked,
		linkedControlClassName,
		onLinkedChange,
		onSplitChange,
		toggleLinked,
		value,
	};
}
