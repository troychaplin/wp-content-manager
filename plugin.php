<?php
/**
 * Plugin Name: Content Manager
 * Description: Provides and interface to manage content across the site.
 * Author: Troy Chaplin
 * Version: 1.0.0
 * Text Domain: content-studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants
define( 'CONTENT_MANAGER_VERSION', '1.0.0' );
class Content_Manager {

	public function __construct() {
		// 1. Load scripts for both the Admin Page and the Site Editor
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		
		// 2. Add a top-level Admin Menu (The "Full App" experience)
		add_action( 'admin_menu', array( $this, 'add_admin_page' ) );
	}

	/**
	 * Registers the admin menu page.
	 */
	public function add_admin_page() {
		add_menu_page(
			__( 'Content Manager', 'content-manager' ),
			__( 'Content Manager', 'content-manager' ),
			'manage_options',
			'content-manager',
			array( $this, 'render_admin_page' ),
			'dashicons-search', // Icon
			75 // Position
		);
	}

	/**
	 * Renders the container for the React App on the standalone admin page.
	 */
	public function render_admin_page() {
		echo '<div id="content-manager-root" class="wrap"></div>';
	}

	/**
	 * Enqueues the React build.
	 */
	public function enqueue_assets( $hook_suffix ) {
		// Only load on our specific admin page OR the Site Editor/Block Editor
		$is_site_editor = 'site-editor.php' === $hook_suffix;
		$is_post_editor = 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix;
		$is_my_page     = 'toplevel_page_content-manager' === $hook_suffix;

		if ( ! $is_site_editor && ! $is_post_editor && ! $is_my_page ) {
			return;
		}

		$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'content-manager-script',
			plugin_dir_url( __FILE__ ) . 'build/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_style(
			'content-manager-style',
			plugin_dir_url( __FILE__ ) . 'build/style-index.css',
			array( 'wp-components' ),
			$asset['version']
		);

		// Enqueue standard WordPress styles to make our standalone page look native
		wp_enqueue_style( 'wp-components' );
	}
}

new Content_Manager();