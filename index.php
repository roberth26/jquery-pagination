<html>
	<head>
		<title>jQuery Pagination</title>
		<link rel="stylesheet" href="style.css" />
	</head>
	<body>
		<header>
			<div class="container">
				<a class="github-btn" href="https://github.com/roberth26/jquery-pagination" target="_blank">Github</a>
				<h1>jQuery Pagination</h1>
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
		</main>
		<footer>
			<div class="container">
				<a href="roberthall.co"><h2>Built by Robert Hall</h2></a>
			</div>
		</footer>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
		<script src="jquery.pagination.js"></script>
		<script>
			(function( $ ) {

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
				});

				$( '#display_count' ).change( function( e ) {
					pagination2.setDisplayCount( $( this ).val() );
				});

			}( jQuery ));
		</script>
	</body>
</html>