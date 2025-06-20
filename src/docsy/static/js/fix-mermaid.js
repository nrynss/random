window.addEventListener('load', function () {
    // Wait a short time after load to ensure all processing is complete
    setTimeout(function () {
        // Find all mermaid elements with truncation
        document.querySelectorAll('pre.mermaid.code-truncated').forEach(function (mermaidEl) {
            // Remove the truncation class
            mermaidEl.classList.remove('code-truncated');

            // Find and remove the expand button that follows it
            const nextEl = mermaidEl.nextElementSibling;
            if (nextEl && nextEl.classList.contains('code-expand-button')) {
                nextEl.remove();
            }
        });
    }, 100); // Small delay to ensure everything has finished processing
});