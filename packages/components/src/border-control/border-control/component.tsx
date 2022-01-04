/**
 * Internal dependencies
 */
import BorderDropdown from '../border-dropdown';
import UnitControl from '../../unit-control';
import RangeControl from '../../range-control';
import { HStack } from '../../h-stack';
import { StyledLabel } from '../../base-control/styles/base-control-styles';
import { View } from '../../view';
import { VisuallyHidden } from '../../visually-hidden';
import { contextConnect, WordPressComponentProps } from '../../ui/context';
import { parseUnit } from '../../unit-control/utils';
import { useBorderControl } from './hook';

import type { Border, BorderControlProps, BorderLabelProps } from '../types';

const sanitizeBorder = ( border: Border | undefined ) => {
	// If width and color are undefined, return undefined for the entire border.
	if ( border?.width === undefined && border?.color === undefined ) {
		return undefined;
	}

	// While this gives us the final result we want for the border it interferes
	// with the display of user selections within this component.
	// In particular, toggling off a border style will display the fallback
	// style value as if it was a user selection. Perhaps we could use a
	// `fallbackStyle` prop to store it. Should the component even handle this?
	return border;

	// // A zero width border forces border style to be `none`.
	// // TODO: Confirm if zero width values will have a unit.
	// if ( border?.width === '0' ) {
	// 	return { ...border, style: 'none' };
	// }

	// // Otherwise use previous style selection or default to `solid`.
	// return {
	// 	...border,
	// 	style: border?.style || 'solid',
	// };
};

const BorderLabel = ( props: BorderLabelProps ) => {
	const { label, hideLabelFromVision } = props;

	if ( ! label ) {
		return null;
	}

	return hideLabelFromVision ? (
		<VisuallyHidden as="label">{ label }</VisuallyHidden>
	) : (
		<StyledLabel>{ label }</StyledLabel>
	);
};

const BorderControl = (
	props: WordPressComponentProps< BorderControlProps, 'div' >,
	forwardedRef: React.Ref< any >
) => {
	const {
		colors,
		hideLabelFromVision,
		innerWrapperClassName,
		label,
		onChange,
		placeholder,
		sliderClassName,
		value: border,
		width,
		widthControlClassName,
		withSlider,
		__experimentalHasMultipleOrigins,
		__experimentalIsRenderedInSidebar,
		...otherProps
	} = useBorderControl( props );

	const [ widthValue, originalWidthUnit ] = parseUnit( border?.width );
	const widthUnit = originalWidthUnit || 'px';

	const onBorderChange = ( newBorder: Border | undefined ) => {
		onChange( sanitizeBorder( newBorder ) );
	};

	const onWidthChange = ( newWidth: string | undefined ) => {
		onBorderChange( { ...border, width: newWidth } );
	};

	const onSliderChange = ( value: string ) => {
		onWidthChange( `${ value }${ widthUnit }` );
	};

	return (
		<View { ...otherProps } ref={ forwardedRef }>
			<BorderLabel
				label={ label }
				hideLabelFromVision={ hideLabelFromVision }
			/>
			<HStack spacing={ 2 }>
				<HStack className={ innerWrapperClassName } style={ { width } }>
					<BorderDropdown
						border={ border }
						colors={ colors }
						onChange={ onBorderChange }
						__experimentalHasMultipleOrigins={
							__experimentalHasMultipleOrigins
						}
						__experimentalIsRenderedInSidebar={
							__experimentalIsRenderedInSidebar
						}
					/>
					<UnitControl
						className={ widthControlClassName }
						min={ 0 }
						onChange={ onWidthChange }
						value={ border?.width || '' }
						placeholder={ placeholder }
					/>
				</HStack>
				{ withSlider && (
					<RangeControl
						className={ sliderClassName }
						initialPosition={ 0 }
						max={ 100 }
						min={ 0 }
						onChange={ onSliderChange }
						step={ [ 'px', '%' ].includes( widthUnit ) ? 1 : 0.1 }
						value={ widthValue || undefined }
						withInputField={ false }
					/>
				) }
			</HStack>
		</View>
	);
};

const ConnectedBorderControl = contextConnect( BorderControl, 'BorderControl' );

export default ConnectedBorderControl;
