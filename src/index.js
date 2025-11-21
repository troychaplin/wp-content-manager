import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { createRoot } from '@wordpress/element';
import { check } from '@wordpress/icons';
import App from './App';

import './style.scss';

/**
 * INTEGRATION 1: The Site Editor Sidebar
 * This registers the tool as a panel in the right-hand sidebar of the Site Editor.
 */
const SidebarComponent = () => (
    <>
        {/* Adds a menu item to the "More" (three dots) menu to toggle the sidebar */}
        <PluginSidebarMoreMenuItem
            target="content-manager-sidebar"
            icon={ check }
        >
            Content Manager
        </PluginSidebarMoreMenuItem>

        {/* The actual Sidebar panel */}
        <PluginSidebar
            name="content-manager-sidebar"
            title="Content Manager"
            icon={ check }
        >
            <div className="content-manager-sidebar-content">
                <p className="description">
                    Quickly replace content from within the editor. 
                    For bulk operations, visit the main dashboard page.
                </p>
                {/* We reuse the same main App component! */}
                <App context="sidebar" />
            </div>
        </PluginSidebar>
    </>
);

// Only register the plugin if we are in the Block/Site Editor environment
if ( window.wp && window.wp.editor ) {
    registerPlugin( 'content-manager', {
        render: SidebarComponent,
        icon: check,
    } );
}

/**
 * INTEGRATION 2: The Standalone Admin Page
 * This renders the tool as a full-screen React app on the specific admin page.
 */
const adminRoot = document.getElementById( 'content-manager-root' );

if ( adminRoot ) {
    const root = createRoot( adminRoot );
    root.render( 
        <div className="content-manager-fullscreen">
            <App context="dashboard" />
        </div> 
    );
}