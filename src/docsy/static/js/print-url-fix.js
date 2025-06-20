/**
 * Print URL Fix Script for Hugo Docsy Theme
 * File: static/js/print-url-fix.js
 *
 * This script fixes localhost URLs in documentation for proper PDF generation
 * by replacing localhost:1313 with docs.endorlabs.com
 */

(function () {
    'use strict';

    // Only run if URL contains ?print=true
    if (!window.location.search.includes('print=true')) {
        return;
    }

    // Configuration
    const CONFIG = {
        localhost_http: 'http://localhost:1313',
        localhost_protocol_relative: '//localhost:1313',
        production: 'https://docs.endorlabs.com',
        debug: true // Set to true for debugging
    };

    /**
     * Log debug messages if debug mode is enabled
     */
    function debugLog(message, data) {
        if (CONFIG.debug) {
            console.log('[Print URL Fix]', message, data || '');
        }
    }

    /**
     * Fix localhost URLs in links for print output - IMMEDIATE VERSION
     */
    function fixPrintUrlsImmediate() {
        // Target specifically the content area and all links within it
        const contentAreas = [
            '.td-content',
            '#main-content',
            'main',
            'article'
        ];

        let fixedCount = 0;
        let totalLinks = 0;
        let localhostLinks = 0;

        contentAreas.forEach(selector => {
            const container = document.querySelector(selector);
            if (!container) {
                debugLog(`Container not found: ${selector}`);
                return;
            }

            debugLog(`\n=== Processing container: ${selector} ===`);

            // Get ALL links within this container
            const links = container.querySelectorAll('a');
            debugLog(`Found ${links.length} links in ${selector}`);
            totalLinks += links.length;

            // Log ALL links to see what we're working with
            links.forEach((link, index) => {
                const originalHref = link.getAttribute('href');
                const computedHref = link.href; // This is the actual computed href with localhost

                debugLog(`Link ${index + 1}:`, {
                    'href attribute': originalHref,
                    'computed href': computedHref,
                    'text': link.textContent?.substring(0, 30) + '...',
                    'is anchor': originalHref?.startsWith('#'),
                    'contains localhost in computed': computedHref?.includes('localhost:1313')
                });

                // Skip anchor links (internal page links starting with #)
                if (originalHref && originalHref.startsWith('#')) {
                    debugLog(`⏭️ Skipping anchor link: ${originalHref}`);
                    return;
                }

                // Check BOTH the attribute AND the computed href for localhost
                if ((originalHref && originalHref.includes('localhost')) ||
                    (computedHref && computedHref.includes('localhost:1313'))) {

                    localhostLinks++;

                    let newHref;

                    // If the href attribute contains localhost, fix that
                    if (originalHref && originalHref.includes('localhost:1313')) {
                        newHref = originalHref.replace(/http:\/\/localhost:1313/g, CONFIG.production);
                        newHref = newHref.replace(/\/\/localhost:1313/g, CONFIG.production);
                    }
                    // If it's a relative path that computes to localhost, convert to docs.endorlabs.com
                    else if (computedHref && computedHref.includes('localhost:1313')) {
                        // Convert the computed localhost URL to docs.endorlabs.com
                        newHref = computedHref.replace(/http:\/\/localhost:1313/g, CONFIG.production);
                    }

                    if (newHref) {
                        // Force the attribute change immediately
                        link.href = newHref;
                        link.setAttribute('href', newHref);

                        // Also update the link text if it shows the URL
                        if (link.textContent && link.textContent.includes('localhost:1313')) {
                            let newText = link.textContent;
                            newText = newText.replace(/http:\/\/localhost:1313/g, CONFIG.production);
                            newText = newText.replace(/\/\/localhost:1313/g, CONFIG.production);
                            link.textContent = newText;
                            link.innerText = newText;
                        }

                        fixedCount++;
                        debugLog(`✅ FIXED link ${fixedCount}:`, {
                            container: selector,
                            'original attr': originalHref,
                            'original computed': computedHref,
                            'new href': newHref,
                            'final href attr': link.getAttribute('href'),
                            'final computed href': link.href,
                            text: link.textContent?.substring(0, 50) + '...'
                        });
                    }
                }
            });
        });

        debugLog(`\n=== SUMMARY ===`);
        debugLog(`Total links found: ${totalLinks}`);
        debugLog(`Localhost links found: ${localhostLinks}`);
        debugLog(`Links fixed: ${fixedCount}`);

        return fixedCount;
    }

    /**
     * Fix localhost URLs in text content (like in code blocks or plain text)
     */
    function fixTextContent() {
        // Only target text elements within the content area
        const contentAreas = ['.td-content', '#main-content', 'main'];

        contentAreas.forEach(selector => {
            const container = document.querySelector(selector);
            if (!container) return;

            const textElements = container.querySelectorAll('code, pre, p, li, td');
            debugLog(`Found ${textElements.length} text elements in ${selector}`);

            textElements.forEach((element) => {
                let textContent = element.textContent;
                if (textContent && textContent.includes('localhost:1313')) {
                    // Replace both http://localhost:1313 and //localhost:1313
                    textContent = textContent.replace(/http:\/\/localhost:1313/g, CONFIG.production);
                    textContent = textContent.replace(/\/\/localhost:1313/g, CONFIG.production);
                    element.textContent = textContent;
                    debugLog('Fixed text content in:', element.tagName);
                }
            });
        });
    }

    // Run IMMEDIATELY - don't wait for anything
    debugLog('Running IMMEDIATE URL fix...');
    fixPrintUrlsImmediate();
    fixTextContent();

    // Run again as soon as possible
    setTimeout(() => {
        debugLog('Running URL fix after 1ms...');
        fixPrintUrlsImmediate();
    }, 1);

    setTimeout(() => {
        debugLog('Running URL fix after 10ms...');
        fixPrintUrlsImmediate();
    }, 10);

    setTimeout(() => {
        debugLog('Running URL fix after 100ms...');
        fixPrintUrlsImmediate();
    }, 100);

    // Also run when DOM is ready (if not already)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            debugLog('DOM Ready - Running URL fix...');
            fixPrintUrlsImmediate();
            fixTextContent();
        });
    }

    // Run before print
    window.addEventListener('beforeprint', function () {
        debugLog('Before print - Running URL fix...');
        fixPrintUrlsImmediate();
        fixTextContent();
    });

    // Add a global function that can be called manually
    window.fixURLsForPrint = function () {
        debugLog('Manual URL fix called...');
        fixPrintUrlsImmediate();
        fixTextContent();
    };

    debugLog('Print URL fix script loaded and running');

})();