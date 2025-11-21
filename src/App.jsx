import React, { useState } from 'react';

// Note: In a real WordPress build environment (using @wordpress/scripts), 
// you would import these from '@wordpress/components'. 
// For this preview to work without build errors, we are using standard HTML elements 
// styled with WordPress Admin CSS classes.

const App = ( { context } ) => {
    const [ findText, setFindText ] = useState( '' );
    const [ replaceText, setReplaceText ] = useState( '' );
    const [ target, setTarget ] = useState( 'posts' );
    const [ isProcessing, setIsProcessing ] = useState( false );
    const [ message, setMessage ] = useState( null );

    const handleReplace = () => {
        setIsProcessing( true );
        setMessage( null );

        // Simulate an API call
        setTimeout( () => {
            setIsProcessing( false );
            setMessage( {
                status: 'success',
                text: `Successfully replaced instances of "${ findText }" with "${ replaceText }".`
            } );
        }, 1500 );
    };

    // Adjust layout based on where the app is running
    const isSidebar = context === 'sidebar';

    return (
        <div className={ `content-manager-app ${ isSidebar ? 'is-sidebar' : 'is-dashboard' }` }>
            
            { ! isSidebar && (
                <div className="app-header" style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>Content Manager</h1>
                    <p style={{ marginTop: '5px', color: '#666' }}>Find and replace content across your entire site database.</p>
                </div>
            ) }

            {/* Simulating PanelBody */}
            <div className="components-panel__body" style={{ border: '1px solid #e0e0e0', padding: '16px', marginBottom: '16px', background: '#fff' }}>
                <h2 className="components-panel__body-title" style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>
                    Search Parameters
                </h2>

                {/* Simulating TextControl for Find */}
                <div className="components-base-control" style={{ marginBottom: '16px' }}>
                    <div className="components-base-control__field">
                        <label className="components-base-control__label" style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                            Find
                        </label>
                        <input
                            className="components-text-control__input"
                            type="text"
                            value={ findText }
                            onChange={ ( e ) => setFindText( e.target.value ) }
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #757575', borderRadius: '2px' }}
                        />
                        <p className="components-base-control__help" style={{ margin: '4px 0 0', fontSize: '12px', color: '#757575' }}>
                            Enter the text string you want to locate.
                        </p>
                    </div>
                </div>

                {/* Simulating TextControl for Replace */}
                <div className="components-base-control" style={{ marginBottom: '16px' }}>
                    <div className="components-base-control__field">
                        <label className="components-base-control__label" style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                            Replace With
                        </label>
                        <input
                            className="components-text-control__input"
                            type="text"
                            value={ replaceText }
                            onChange={ ( e ) => setReplaceText( e.target.value ) }
                            style={{ width: '100%', padding: '6px 8px', border: '1px solid #757575', borderRadius: '2px' }}
                        />
                        <p className="components-base-control__help" style={{ margin: '4px 0 0', fontSize: '12px', color: '#757575' }}>
                            Enter the new content.
                        </p>
                    </div>
                </div>
                
                {/* Simulating SelectControl */}
                <div className="components-base-control">
                    <div className="components-base-control__field">
                        <label className="components-base-control__label" style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                            Target
                        </label>
                        <select
                            className="components-select-control__input"
                            value={ target }
                            onChange={ ( e ) => setTarget( e.target.value ) }
                            style={{ width: '100%', maxWidth: '100%' }}
                        >
                            <option value="all">All Post Types</option>
                            <option value="posts">Posts Only</option>
                            <option value="pages">Pages Only</option>
                            <option value="media">Media Metadata</option>
                        </select>
                    </div>
                </div>
            </div>

            { message && (
                 <div className="components-notice is-success" style={{ padding: '12px', background: '#f0f6fc', borderLeft: '4px solid #00a32a', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ flexGrow: 1, color: '#1d2327' }}>{ message.text }</span>
                    <button 
                        onClick={ () => setMessage( null ) }
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                        &times;
                    </button>
                </div>
            ) }

            <div className="actions-area" style={{ padding: isSidebar ? '0' : '16px 0' }}>
                <button 
                    className="components-button is-primary"
                    onClick={ handleReplace }
                    disabled={ ! findText || isProcessing }
                    style={{ 
                        background: isProcessing ? '#f0f0f0' : '#2271b1', 
                        color: isProcessing ? '#666' : '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: isProcessing ? 'default' : 'pointer',
                        fontWeight: 600
                    }}
                >
                    { isProcessing ? 'Processing...' : 'Run Replacement' }
                </button>
            </div>
            
            { /* Example of contextual UI: Only show detailed logs on the dashboard, not sidebar */ }
            { ! isSidebar && (
                 <div className="components-placeholder" style={{ marginTop: '20px', border: '1px dashed #c3c4c7', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="components-placeholder__label" style={{ fontWeight: 600, fontSize: '14px', marginBottom: '10px' }}>
                        Replacement Logs
                    </div>
                    <div className="components-placeholder__fieldset">
                         <div style={{ color: '#757575' }}>No recent activity found.</div>
                    </div>
                </div>
            ) }
        </div>
    );
};

export default App;