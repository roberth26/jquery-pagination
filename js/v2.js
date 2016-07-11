(function( $ ) {
	function Pagination( props ) {

		function changePage( page ) {
			console.log( page );
		}

		function render() {
			var items = [];
			if ( props.showFirstLink ) {
				items.push( PaginationItem({
					content: 'First',
					pageIndex: 1,
					onChangePage: changePage,
					className: 'pagination__item--first'
				}));
			}
			return items;
		}

		return {
			render: render
		}
	}

	// functional, stateless PaginationItem component
	function PaginationItem( props ) {
		function handleChangePage( e ) {
			console.log( 'asas' );
			props.onChangePage( 10 );
		}

		return $( '<li />', {
			'class': 'pagination__item ' + props.className,
			html: props.content,
			onclick: handleChangePage
		});
	}

	$.fn.pagination = function( config ) {
		return this.each( function() {
			var $el = $( this ); // cast as jQuery object
            // override defaults with attributes
            var attributes = $.extend( true, {}, $.fn.pagination.defaults, $el.data() );
            // override attributes with config
            var props = $.extend( true, {}, attributes, config );
            // create a pagination component
            var pagination = Pagination( props );
            // render component inside this element
            $el.html( pagination.render() );
		});
	};

    $.fn.pagination.defaults = {
        pageCount: 10,
        displayCount: 5,
        currentPage: 1,
        linkTemplate: false,
        disabledLinks: false,
        showFirstLink: true,
        showPreviousFewLink: true,
        showPreviousLink: true,
        showNextLink: true,
        showNextFewLink: true,
        showLastLink: true,
        onPageChange: function( currentPage, nextPage ) {}
    };

}( jQuery ));