import React from 'react';

export type Action = {
	action: String,
}

export type Element = React.Element<*>;

export type Style =
	| { [key: string]: any }
	| number
	| false
	| null
	| void
	| Array<Style>;

export type Layout = {
	x: number,
	y: number,
	width: number,
	height: number,
};

export type LayoutEvent = {
	nativeEvent: {
		layout: Layout,
	},
};

export type Dimension = {
	width?: Number,
	height?: Number,
	scale?: Number,
	fontScale?: Number,
};

export type Dimensions = {
	window?: Dimension,
	screen?: Dimension,
};

export type ConsoleMessage = {
	text?: String,
	color?: String,
	loading?: Boolean,
};
