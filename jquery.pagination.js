(function( $ ) {

    $.fn.pagination = function( config ) {
        return this.each( function() {
            var $el = $( this ); // cast to jquery object
            // override defaults with attributes
            var attributes = $.extend( true, {}, $.fn.pagination.defaults, $el.data() );
            // override attributes with config
            var props = $.extend( true, {}, attributes, config );

            function render() {
                // serves to collect pagination items
                var $items = $( '<div />' );

                // 'first' link
                (function( $items, props ) {
                    if ( !props.showFirstLink ) return;
                    if ( props.disabledLinks && props.currentPage == 1 ) {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--first pagination__item--disabled'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    text: 'First'
                                })
                            )
                        );
                    } else {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--first'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    'data-index': 1,
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', 1 ) : '#',
                                    text: 'First'
                                })
                            )
                        );
                    }
                }( $items, props ));

                // previous few link
                (function( $items, props ) {
                    if ( !props.showPreviousFewLink ) return;
                    if ( props.disabledLinks && props.currentPage == 1 ) {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--previous-few pagination__item--disabled'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    text: '...'
                                })
                            )
                        );
                    } else {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--previous-few'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', Math.max( 1, props.currentPage - props.displayCount ) ) : '#',
                                    'data-index': Math.max( 1, props.currentPage - props.displayCount ),
                                    text: '...'
                                })
                            )
                        ); 
                    }
                }( $items, props ));

                // previous page link
                (function( $items, props ) {
                    if ( !props.showPreviousLink ) return;
                    if ( props.disabledLinks && props.currentPage == 1 ) {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--previous pagination__item--disabled'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    html: '&lt;'
                                })
                            )
                        );
                    } else {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--previous'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', Math.max( 1, props.currentPage - 1 ) ) : '#',
                                    'data-index': Math.max( 1, props.currentPage - 1 ),
                                    html: '&lt;'
                                })
                            )
                        );  
                    }
                }( $items, props ));

                // indexed page links
                (function( $items, props ) {
                    var displayCount = Math.min( props.pageCount, props.displayCount );
                    var start = props.currentPage - parseInt( displayCount / 2 );
                    // ensure start index isn't out of max bounds
                    start = Math.min( props.pageCount - displayCount + 1, start ); 
                    // ensure start index is >= 1
                    start = Math.max( 1, start );
                    var end = start + displayCount - 1;
                    // ensure end index isn't out of max bounds
                    end = Math.min( props.pageCount, end );
                    
                    for ( var i = start; i <= end; i++ ) {
                        $items.append(
                            $( '<li />', {
                                'class': i == props.currentPage ? 'pagination__item pagination__item--page pagination__item--active' : 'pagination__item pagination__item--page'
                            }).append(
                                $( '<a />', {
                                    text: i,
                                    'data-index': i,
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', i ) : '#',
                                    'class': 'pagination__item__link'
                                })
                            )
                        );
                    }
                }( $items, props ));

                // next page link
                (function( $items, props ) {
                    if ( !props.showNextLink ) return;
                    if ( props.disabledLinks && props.currentPage >= props.pageCount ) {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--next pagination__item--disabled'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    html: '&gt;'
                                })
                            )
                        );
                    } else {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--next'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', Math.min( props.pageCount, props.currentPage + 1 ) ) : '#',
                                    'data-index': Math.min( props.pageCount, props.currentPage + 1 ),
                                    html: '&gt;'
                                })
                            )
                        );
                    }
                }( $items, props ));

                // next few link
                (function( $items, props ) {
                    if ( !props.showNextFewLink ) return;
                    if ( props.disabledLinks && props.currentPage >= props.pageCount ) {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--next-few pagination__item--disabled'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    text: '...'
                                })
                            )
                        );
                    } else {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--next-few'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', Math.min( props.pageCount, props.currentPage + props.displayCount ) ) : '#',
                                    'data-index': Math.min( props.pageCount, props.currentPage + props.displayCount ),
                                    text: '...'
                                })
                            )
                        );
                    }
                }( $items, props ));

                // 'last' page link
                (function( $items, props ) {
                    if ( !props.showLastLink ) return;
                    if ( props.disabledLinks && props.currentPage >= props.pageCount ) {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--last pagination__item--disabled'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    text: 'Last'
                                })
                            )
                        );
                    } else {
                        $items.append(
                            $( '<li />', {
                                'class': 'pagination__item pagination__item--last'
                            }).append(
                                $( '<a />', {
                                    'class': 'pagination__item__link',
                                    href: props.linkTemplate ? props.linkTemplate.replace( '{page}', props.pageCount ) : '#',
                                    'data-index': props.pageCount,
                                    text: 'Last'
                                })
                            )
                        );  
                    }
                }( $items, props ));

                // append
                $el.html( $items.html() );
            }

            function setPageCount( count ) {
                props.pageCount = Math.max( 1, count );
                props.currentPage = Math.min( props.pageCount, props.currentPage );
                render();
            }

            function getPageCount() {
                return props.pageCount;
            }

            function setDisplayCount( count ) {
                props.displayCount = count;
                render();
            }

            function getDisplayCount() {
                return props.displayCount;
            }

            function setCurrentPage( page ) {
                var currentPage = props.currentPage;
                props.currentPage = Math.max( 1, page );
                props.currentPage = Math.min( props.pageCount, props.currentPage );
                if ( props.onPageChange && currentPage != props.currentPage )
                    props.onPageChange.call( null, currentPage, props.currentPage );
                render();
            }

            function getCurrentPage() {
                return props.currentPage;
            }

            render();

            // setup api
            $el.data( 'pagination', {
                update: render,
                setPageCount: setPageCount,
                getPageCount: getPageCount,
                setDisplayCount: setDisplayCount,
                getDisplayCount: getDisplayCount,
                setCurrentPage: setCurrentPage,
                getCurrentPage: getCurrentPage
            });

            // user event bindings
            $el.on( 'click', '.pagination__item__link', function( e ) {
                if ( $( this ).attr( 'href' ) == '#' ) {
                    setCurrentPage( parseInt( $( this ).data( 'index' ) ) );
                    return false;
                }
            });

            $el.addClass( 'pagination' );
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
        showLastLink: true
    };

}( jQuery ));