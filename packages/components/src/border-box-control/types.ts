/**
 * Internal dependencies
 */
import type { Border, Color } from '../border-control/types';

export type Borders = {
	top?: Border;
	right?: Border;
	bottom?: Border;
	left?: Border;
};
export type BordersKey = keyof Borders;

export type BorderBoxControlProps = {
	/**
	 * The child elements.
	 */
	children: React.ReactNode;
	colors?: Color[];
	onChange: ( value: Borders | undefined ) => void;
	value: Borders;
	__experimentalHasMultipleOrigins?: boolean;
	__experimentalIsRenderedInSidebar?: boolean;
};

export type LinkedButtonProps = {
	isLinked: boolean;
	onClick: () => void;
};

export type BorderVisualizerProps = {
	value?: Borders;
};

export type SplitBorderControlProps = {
	colors?: Color[];
	onChange: ( value: Border | undefined, side: BordersKey ) => void;
	value?: Borders;
	__experimentalHasMultipleOrigins?: boolean;
	__experimentalIsRenderedInSidebar?: boolean;
};
