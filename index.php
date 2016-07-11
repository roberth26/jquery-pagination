<html>
	<head>
		<title>jQuery Pagination</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="css/highlight.min.css" />
	</head>
	<body>
		<header>
			<div class="container">
				<h1>jQuery Pagination</h1>
				<a class="download-btn" href="jquery.pagination.min.js" download>Download</a>
				<a class="github-btn" href="https://github.com/roberth26/jquery-pagination" target="_blank">Github</a>
			</div>
		</header>
		<main>
			<div class="container">
				<section class="example">				
					<?php
						$page_count = 10; // this would be the number of database entries
						if ( !is_null( $_GET[ 'page' ] ) )
							$page = $_GET[ 'page' ];
						else
							$page = 1;
					?>
					<div class="example__info">
						<ul>
							<li><strong>pageCount:</strong> <?php echo $page_count; ?> *from server</li>
							<li><strong>currentPage:</strong> <?php echo $page; ?> *from server</li>
							<li><strong>displayCount:</strong> 5</li>
							<li><strong>linkTemplate:</strong> ?page={page}</li>
							<li><strong>disabledLinks:</strong> true</li>
						</ul>
					</div>
					<div class="example__wrapper">
						<ol	class="pagination"
							id="pagination"
							data-page-count="<?php echo $page_count; ?>"
							data-display-count="5"
							data-current-page="<?php echo $page; ?>",
							data-link-template="?page={page}",
							data-disabled-links="true"
						></ol>
						<div class="mobile">
							<p>*API method(s) used to configure pagination for mobile:</p>
							<ul>
								<li>setDisplayCount( 3 )</li>
								<li>Some items hidden with CSS</li>
							</ul>
						</div>
					</div>
				</section>
				<hr />
				<section class="example">
					<div class="example__info">
						<ul>
							<li><label>pageCount:</label> <input type="number" id="page_count" min="1" value="7" /></li>
							<li><label>currentPage:</label> <input type="number" id="current_page" min="1" value="4" /></li>
							<li><label>displayCount:</label> <input type="number" id="display_count" min="1" value="3" /></li>
						</ul>
					</div>
					<div class="example__wrapper">
						<ol	id="pagination2"></ol>
					</div>
				</section>
			</div>
			<section class="how-to">
				<div class="container">
					<h2>How To Use</h2>
<pre>
<code id="code" class="javascript">
(function( $ ) {
	/*
		&lt;ol id="pagination"&gt;&lt;/ol&gt;

		All options can be applied to the element via
		attributes, ie data-current-page="10". You can
		use your server-side language to print the
		current page, page count, etc. into an attribute.
	*/
	var $pagination = $( '#pagination' ).pagination({
		// these are all the options with their default values
		pageCount: 10, // the total number of pages
		displayCount: 5, // the number of page links to display
		currentPage: 1, // the current page
		linkTemplate: false, // a string template to use for links.
			// '{page}' will be replaced with the current page	
		disabledLinks: false, // whether or not to disable unnecessary links	        
		showFirstLink: true, // whether or not to show the 'first' link
		showPreviousFewLink: true, // whether or not to show the 'previous few' link
		showPreviousLink: true, // whether or not to show the 'previous' link
		showNextLink: true, // whether or not to show the 'next' link
		showNextFewLink: true, // whether or not to show the 'next few' link
		showLastLink: true, // whether or not to show the 'last' link
		onPageChange: function( currentPage, nextPage ) {} // callback function
	});

	// retrieve the api
	var api = $pagination.data( 'pagination' );
	// the api methods
	api.update(); // re-renders the pagination component
	api.setPageCount( int ); // sets a new page count and re-renders
	api.getPageCount(); // gets the current page count
	api.setDisplayCount( int ); // sets a new display count and re-renders
	api.getDisplayCount(); // gets the current display count
	api.setCurrentPage( int ); // sets a new current page and re-renders
	api.getCurrentPage(); // gets the current page
}( jQuery ));
</code>
</pre>
				</div>
			</section>
		</main>
		<footer>
			<div class="container">
				<a href="http://roberthall.co"><h2>Built by Robert Hall</h2></a>
			</div>
		</footer>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
		<script src="js/jquery.pagination.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js"></script>
		<script>
			(function( $ ) {

			$(document).ready(function() {
				hljs.configure( { tabReplace: '    ' } )
			  $('pre code').each(function(i, block) {
			    hljs.highlightBlock(block);
			  });
			});


				// init pagination and retrieve api for this instance
				var pagination = $( '#pagination' ).pagination().data( 'pagination' );

				$( window ).resize( function() {
					if ( $( this ).width() <= 768 ) {
						pagination.setDisplayCount( 3 );
					} else {
						pagination.setDisplayCount( pagination.getDisplayCount() );
					}
				});

				$( window ).resize();

				// init pagination and retrieve api for this instance
				var pagination2 = $( '#pagination2' ).pagination({
					pageCount: 7,
					displayCount: 3,
					currentPage: 4,
					onPageChange: function( currentPage, nextPage ) {
						$( '#current_page' ).val( nextPage );
					}
				}).data( 'pagination' );

				// bindings
				$( '#page_count' ).change( function( e ) {
					pagination2.setPageCount( $( this ).val() );
				});

				$( '#current_page' ).change( function( e ) {
					pagination2.setCurrentPage( $( this ).val() );
					if ( $( this ).val() > pagination2.getPageCount() )
						$( this ).val( pagination2.getPageCount() );
				});

				$( '#display_count' ).change( function( e ) {
					pagination2.setDisplayCount( $( this ).val() );
				});

			}( jQuery ));
		</script>
	</body>
</html>