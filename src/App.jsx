import React, { useState } from 'react';

// Mock Data to simulate search results
const MOCK_RESULTS = [
    { id: 1, title: 'Hello World', type: 'Post', date: 'Nov 20, 2025', snippet: 'Welcome to WordPress. This is your ...' },
    { id: 2, title: 'About Us', type: 'Page', date: 'Oct 12, 2025', snippet: '... content manager tool is amazing ...' },
    { id: 3, title: 'Contact', type: 'Page', date: 'Sep 05, 2025', snippet: '... contact us for more content ...' },
    { id: 4, title: 'Blue Shoes', type: 'Product', date: 'Aug 22, 2025', snippet: '... content for the best running shoes ...' },
    { id: 5, title: 'Red Hat', type: 'Product', date: 'July 19, 2025', snippet: '... replacement guaranteed if not satisfied ...' },
];

const App = ( { context } ) => {
    const [ findText, setFindText ] = useState( '' );
    const [ replaceText, setReplaceText ] = useState( '' );
    const [ hasSearched, setHasSearched ] = useState( false );
    const [ selectedItems, setSelectedItems ] = useState( [] );
    const [ layout, setLayout ] = useState( 'table' ); // 'table' or 'grid'

    const isSidebar = context === 'sidebar';

    const handleSearch = () => {
        setHasSearched( true );
    };

    const toggleSelection = ( id ) => {
        if ( selectedItems.includes( id ) ) {
            setSelectedItems( selectedItems.filter( item => item !== id ) );
        } else {
            setSelectedItems( [ ...selectedItems, id ] );
        }
    };

    return (
        <div className={ `content-manager-app ${ isSidebar ? 'is-sidebar' : 'is-dashboard' }` }>
            
            {/* HEADER: Dashboard Only */}
            { ! isSidebar && (
                <div className="app-header" style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                    <h1 style={{ fontSize: '24px', margin: 0 }}>Content Manager</h1>
                    <p style={{ marginTop: '5px', color: '#666' }}>Find and replace content across your entire site database.</p>
                </div>
            ) }

            {/* SECTION 1: SEARCH PARAMETERS (Always Visible) */}
            <div className="components-panel__body" style={{ background: '#fff', border: isSidebar ? 'none' : '1px solid #e0e0e0', padding: '16px', borderRadius: '4px', marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Search Parameters</h2>
                
                <div className="components-base-control" style={{ marginBottom: '16px' }}>
                    <label className="components-base-control__label" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Find</label>
                    <input 
                        type="text" 
                        value={ findText } 
                        onChange={ e => setFindText( e.target.value ) }
                        className="components-text-control__input"
                        placeholder="e.g. Old Company Name"
                        style={{ width: '100%', padding: '8px', border: '1px solid #949494', borderRadius: '2px' }}
                    />
                </div>

                <div className="components-base-control" style={{ marginBottom: '16px' }}>
                    <label className="components-base-control__label" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>Replace With</label>
                    <input 
                        type="text" 
                        value={ replaceText } 
                        onChange={ e => setReplaceText( e.target.value ) }
                        className="components-text-control__input"
                        placeholder="e.g. New Company Name"
                        style={{ width: '100%', padding: '8px', border: '1px solid #949494', borderRadius: '2px' }}
                    />
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        className="components-button is-primary"
                        onClick={ handleSearch }
                        style={{ background: '#2271b1', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 600, cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Find Matches
                    </button>
                </div>
            </div>

            {/* SECTION 2: DATA VIEW (Conditionally Rendered Below) */}
            { hasSearched && (
                <div className={ `content-manager-dataview ${ isSidebar ? 'is-sidebar' : '' }` }>
                    
                    {/* DataView Header / Toolbar */}
                    <div className="dataview-header">
                        <div className="dataview-title-area">
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Search Results</h2>
                        </div>
                        
                        <div className="dataview-actions">
                            <div className="dataview-view-switcher">
                                <button 
                                    className={ `switcher-btn ${ layout === 'table' ? 'active' : '' }` }
                                    onClick={ () => setLayout('table') }
                                    title="List View"
                                >
                                   ☰
                                </button>
                                <button 
                                    className={ `switcher-btn ${ layout === 'grid' ? 'active' : '' }` }
                                    onClick={ () => setLayout('grid') }
                                    title="Grid View"
                                >
                                   ☷
                                </button>
                            </div>
                            <button className="dataview-filter-btn">
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* DataView Content Area */}
                    <div className="dataview-content">
                        
                        { layout === 'table' ? (
                            <table className="wp-list-table widefat fixed striped">
                                <thead>
                                    <tr>
                                        <td id="cb" className="manage-column column-cb check-column">
                                            <input type="checkbox" />
                                        </td>
                                        <th className="manage-column column-title column-primary">Title</th>
                                        <th className="manage-column">Context Snippet</th>
                                        <th className="manage-column">Type</th>
                                        <th className="manage-column">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { MOCK_RESULTS.map( item => (
                                        <tr key={ item.id }>
                                            <th scope="row" className="check-column">
                                                <input 
                                                    type="checkbox" 
                                                    checked={ selectedItems.includes( item.id ) }
                                                    onChange={ () => toggleSelection( item.id ) }
                                                />
                                            </th>
                                            <td className="title column-title has-row-actions">
                                                <strong>{ item.title }</strong>
                                            </td>
                                            <td>
                                                <span style={{ background: '#fff8c5', padding: '2px' }}>{ item.snippet }</span>
                                            </td>
                                            <td>{ item.type }</td>
                                            <td>{ item.date }</td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                        ) : (
                            <div className="dataview-grid">
                                { MOCK_RESULTS.map( item => (
                                    <div className="dataview-card" key={ item.id }>
                                        <div className="card-header">
                                            <input 
                                                type="checkbox" 
                                                checked={ selectedItems.includes( item.id ) }
                                                onChange={ () => toggleSelection( item.id ) }
                                            />
                                        </div>
                                        <div className="card-preview">
                                            <div className="preview-placeholder">Aa</div>
                                        </div>
                                        <div className="card-body">
                                            <strong>{ item.title }</strong>
                                            <div style={{ fontSize: '12px', color: '#757575' }}>{ item.type }</div>
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        ) }
                    </div>

                    {/* DataView Footer */}
                    <div className="dataview-footer">
                        <div className="bulk-actions">
                            { selectedItems.length > 0 && (
                                <button className="components-button is-primary" style={{ background: '#2271b1', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                                    Replace Selected ({ selectedItems.length })
                                </button>
                            ) }
                        </div>
                        <div className="pagination">
                            <span className="pagination-links">
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">«</span>
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">‹</span>
                                <span className="paging-input">
                                    <span className="current-page">1</span> of <span className="total-pages">1</span>
                                </span>
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">›</span>
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">»</span>
                            </span>
                        </div>
                    </div>

                </div>
            ) }
        </div>
    );
};

export default App;