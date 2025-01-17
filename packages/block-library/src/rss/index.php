<?php
/**
 * Server-side rendering of the `core/rss` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/rss` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content with received rss items.
 */
function render_block_core_rss( $attributes ) {
	$rss = fetch_feed( $attributes['feedURL'] );

	if ( is_wp_error( $rss ) ) {
		return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . esc_html__( 'RSS Error:' ) . '</strong> ' . esc_html( $rss->get_error_message() ) . '</div></div>';
	}

	if ( ! $rss->get_item_quantity() ) {
		return '<div class="components-placeholder"><div class="notice notice-error">' . esc_html__( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</div></div>';
	}

	$rss_items  = $rss->get_items( 0, $attributes['itemsToShow'] );
	$list_items = '';
	foreach ( $rss_items as $item ) {
		$title = esc_html( trim( strip_tags( $item->get_title() ) ) );
		if ( empty( $title ) ) {
			$title = __( '(no title)' );
		}
		$link = $item->get_link();

		if ( $link ) {
			$title = '<a href="' . esc_url( $link ) . '">' . esc_html( $title ) . '</a>';
		}
		$title = '<div class="wp-block-rss__item-title">' . esc_html( $title ) . '</div>';

		$date = '';
		if ( $attributes['displayDate'] ) {
			$date = $item->get_date( 'U' );

			if ( $date ) {
				$date = sprintf(
					'<time datetime="%1$s" class="wp-block-rss__item-publish-date">%2$s</time> ',
					esc_attr( date_i18n( get_option( 'c' ), $date ) ),
					esc_html( date_i18n( get_option( 'date_format' ), $date ) )
				);
			}
		}

		$author = '';
		if ( $attributes['displayAuthor'] ) {
			$author = $item->get_author();
			if ( is_object( $author ) ) {
				$author = $author->get_name();
				$author = '<span class="wp-block-rss__item-author">' . sprintf(
					/* translators: %s: the author. */
					esc_html__( 'by %s' ),
					esc_html( strip_tags( $author ) )
				) . '</span>';
			}
		}

		$excerpt = '';
		if ( $attributes['displayExcerpt'] ) {
			$excerpt = html_entity_decode( $item->get_description(), ENT_QUOTES, get_option( 'blog_charset' ) );
			$excerpt = wp_trim_words( $excerpt, $attributes['excerptLength'], ' [&hellip;]' );

			// Change existing [...] to [&hellip;].
			if ( '[...]' === substr( $excerpt, -5 ) ) {
				$excerpt = substr( $excerpt, 0, -5 ) . '[&hellip;]';
			}

			$excerpt = '<div class="wp-block-rss__item-excerpt">' . esc_html( $excerpt ) . '</div>';
		}

		$list_items .= '<li class="wp-block-rss__item">' . esc_html( $title . $date . $author . $excerpt ) . '</li>';
	}

	$classnames = array();
	if ( isset( $attributes['blockLayout'] ) && 'grid' === $attributes['blockLayout'] ) {
		$classnames[] = 'is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['blockLayout'] ) {
		$classnames[] = 'columns-' . $attributes['columns'];
	}
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classnames ) ) );

	return sprintf( '<ul %s>%s</ul>', $wrapper_attributes, $list_items );
}

/**
 * Registers the `core/rss` block on server.
 */
function register_block_core_rss() {
	register_block_type_from_metadata(
		__DIR__ . '/rss',
		array(
			'render_callback' => 'render_block_core_rss',
		)
	);
}
add_action( 'init', 'register_block_core_rss' );
