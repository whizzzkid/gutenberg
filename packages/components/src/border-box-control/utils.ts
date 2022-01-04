/**
 * Internal dependencies
 */
import type { Border } from '../border-control/types';
import type { Borders, BordersKey } from './types';

export const hasMixedBorders = ( borders: Borders | undefined ) => {
	if ( borders === undefined ) {
		return false;
	}

	const sides: BordersKey[] = [ 'top', 'right', 'bottom', 'left' ];
	const shorthandBorders = sides.map( ( side ) =>
		getShorthandBorderStyle( borders?.[ side ] )
	);

	return ! shorthandBorders.every(
		( border ) => border === shorthandBorders[ 0 ]
	);
};

export const getShorthandBorderStyle = ( border: Border | undefined ) => {
	if ( ! border ) {
		return;
	}

	const { color, style, width } = border;
	const hasVisibleBorder = !! width || !! color;
	const borderStyle = hasVisibleBorder ? style || 'solid' : style;

	// TODO: Can I get a `'0'` value from UnitControl?
	// const borderProps = [ width, borderStyle, color ];
	// return borderProps.filter( ( prop ) => prop !== undefined ).join( ' ' );

	return [ width, borderStyle, color ].filter( Boolean ).join( ' ' );
};

export const getClampedWidthBorderStyle = (
	border: Border | undefined,
	min = '1px',
	max = '10px'
) => {
	// TODO: console.debug( 'getClampedWidthBorderStyle: ', { border, min, max } );

	if ( ! border ) {
		return;
	}

	return getShorthandBorderStyle( {
		...border,
		width: !! border.width
			? `clamp( ${ min }, ${ border.width }, ${ max } )`
			: undefined,
	} );
};
