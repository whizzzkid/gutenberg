/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { BorderBoxControl } from '../';

// Available border colors.
const colors = [
	{ name: 'Gray 0', color: '#f6f7f7' },
	{ name: 'Gray 5', color: '#dcdcde' },
	{ name: 'Gray 20', color: '#a7aaad' },
	{ name: 'Gray 70', color: '#3c434a' },
	{ name: 'Gray 100', color: '#101517' },
	{ name: 'Blue 20', color: '#72aee6' },
	{ name: 'Blue 40', color: '#3582c4' },
	{ name: 'Blue 70', color: '#0a4b78' },
	{ name: 'Red 40', color: '#e65054' },
	{ name: 'Red 70', color: '#8a2424' },
	{ name: 'Green 10', color: '#68de7c' },
	{ name: 'Green 40', color: '#00a32a' },
	{ name: 'Green 60', color: '#007017' },
	{ name: 'Yellow 10', color: '#f2d675' },
	{ name: 'Yellow 40', color: '#bd8600' },
];

export default {
	title: 'Components (Experimental)/BorderBoxControl',
	component: BorderBoxControl,
};

export const _default = () => {
	const [ borders, setBorders ] = useState();

	return (
		<WrapperView>
			<BorderBoxControl
				colors={ colors }
				onChange={ ( newBorders ) => {
					// console.debug( newBorders );
					setBorders( newBorders );
				} }
				value={ borders }
			/>
		</WrapperView>
	);
};

const WrapperView = styled.div`
	max-width: 280px;
	padding: 16px;
`;
