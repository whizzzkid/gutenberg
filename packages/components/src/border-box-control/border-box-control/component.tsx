/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkedButton from '../linked-button';
import SplitBorderControl from '../split-border-control';
import { BorderControl } from '../../border-control';
import { HStack } from '../../h-stack';
import { View } from '../../view';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { useBorderBoxControl } from './hook';

import type { BorderBoxControlProps } from '../types';

const BorderBoxControl = (
	props: WordPressComponentProps< BorderBoxControlProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const {
		className,
		colors,
		hasMixedBorders,
		isLinked,
		linkedControlClassName,
		onLinkedChange,
		onSplitChange,
		toggleLinked,
		value,
		__experimentalHasMultipleOrigins,
		__experimentalIsRenderedInSidebar,
		...otherProps
	} = useBorderBoxControl( props );

	return (
		<View className={ className } { ...otherProps } ref={ forwardedRef }>
			<HStack alignment={ 'start' } expanded={ true } spacing={ 3 }>
				{ isLinked ? (
					<BorderControl
						className={ linkedControlClassName }
						colors={ colors }
						onChange={ onLinkedChange }
						placeholder={
							hasMixedBorders ? __( 'Mixed' ) : undefined
						}
						value={ hasMixedBorders ? undefined : value?.top }
						withSlider={ true }
						width={ '110px' }
						__experimentalHasMultipleOrigins={
							__experimentalHasMultipleOrigins
						}
						__experimentalIsRenderedInSidebar={
							__experimentalIsRenderedInSidebar
						}
					/>
				) : (
					<SplitBorderControl
						colors={ colors }
						onChange={ onSplitChange }
						value={ value }
						__experimentalHasMultipleOrigins={
							__experimentalHasMultipleOrigins
						}
						__experimentalIsRenderedInSidebar={
							__experimentalIsRenderedInSidebar
						}
					/>
				) }
				<LinkedButton onClick={ toggleLinked } isLinked={ isLinked } />
			</HStack>
		</View>
	);
};

const ConnectedBorderBoxControl = contextConnect(
	BorderBoxControl,
	'BorderBoxControl'
);

export default ConnectedBorderBoxControl;
