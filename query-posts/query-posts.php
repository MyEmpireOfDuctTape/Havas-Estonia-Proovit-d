<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://dsgnbyhl.com
 * @since             1.0.0
 * @package           Posts_Plugin
 *
 * @wordpress-plugin
 * Plugin Name:       Show some posts
 * Plugin URI:        https://dsgnbyhl.com
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Henry Lõiv
 * Author URI:        https://dsgnbyhl.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       query-posts
 * Domain Path:       /languages
 */


add_action('admin_menu', 'populate_menu');
function populate_menu()
{
	add_options_page('Query Posts', 'Query Posts', 'manage_options', 'my-plugin', 'queryPosts');
}


add_filter('the_excerpt', 'trim_excerpt');


function trim_excerpt($content)
{

	return substr(strip_tags($content), 0, 200);
}


function queryPosts()
{
	?>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

	<div class="container pt-5">

		<?php $the_query = new WP_Query('posts_per_page=-1'); ?>

	</div>
	<div class="container mt-3">
		<?php

		// Set indicator to 0;
		$i = 0;
		?>
		<div class="row">
			<div class="card-deck">
				<?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
					<div class="card mb-4 col-sm-4" style="min-width: 18rem; max-width: 18rem;">
						<a href="<?php echo get_edit_post_link(); ?>">
							<?php if (has_post_thumbnail()) { ?>
								<img class="card-img-top" src="
															
            					<?php the_post_thumbnail_url(); ?>" id="contextual" class="contextual" alt="" />

							<?php
							} else {
								?>
								<div class="card-img-top" style="background-color:#ccc; width: 100%;height: 222px;"></div>
							<?php } ?>
						</a>
						<div class="card-body">
							<h5 class="card-title text-center"><a href="<?php echo get_edit_post_link(); ?>"><?php the_title(); ?></a></h5>
							<p class="card-text"><?php echo the_excerpt(); ?></p>
							<p class="card-text"><small class="text-muted"><time datetime="<?php echo get_the_date('c'); ?>" itemprop="datePublished"><?php echo get_the_date(); ?></time></small></p>

						</div>
						<?php
						// if we're at the end close the row
						if ($i == 0) {
							echo '</div>';
						} else {
							/** 
							 * Perform modulus calculation to check whether $i / 2 is whole number
							 * if true close row and open a new one
							 */
							if ($i % 2 == 0) {
								echo '</div><div class="row">';
							}
						}
						?>
					<?php
					endwhile;
					wp_reset_postdata();
					?>
				</div>
			</div>
		</div>
	</div>




<?php
}


// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('DATA_PLUGIN_VERSION', '1.0.0');
