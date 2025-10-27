// Ghost Integration Demo JavaScript
class GhostIntegrationDemo {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupEditor();
        this.showIntegrationModal();
        this.setupExportButtons();
    }
    
    bindEvents() {
        // Publish button
        document.getElementById('publishBtn').addEventListener('click', () => {
            this.showPublishWorkflow();
        });
        
        // Modal close
        document.getElementById('modalClose').addEventListener('click', () => {
            this.hideIntegrationModal();
        });
        
        // CTA buttons
        document.getElementById('scheduleDemoBtn').addEventListener('click', () => {
            this.scheduleDemo();
        });
        
        document.getElementById('viewDocsBtn').addEventListener('click', () => {
            this.viewDocumentation();
        });
        
        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleExport(e.target.closest('.export-btn'));
            });
        });
        
        // Close modal on background click
        document.getElementById('integrationModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('integrationModal')) {
                this.hideIntegrationModal();
            }
        });

        // Save draft button
        document.getElementById('saveDraftBtn').addEventListener('click', () => {
            this.saveDraft();
        });

        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.togglePreview();
        });

        // Publish options button
        document.getElementById('publishOptionsBtn').addEventListener('click', () => {
            this.showPublishOptions();
        });
    }

    setupEditor() {
        const editor = document.getElementById('qetEditor');
        const preview = document.getElementById('qetPreview');

        // Real-time preview update
        editor.addEventListener('input', () => {
            const markdown = editor.value;
            const html = MarkdownParser.parse(markdown);
            preview.innerHTML = html;
        });

        // Initial preview
        const markdown = editor.value;
        const html = MarkdownParser.parse(markdown);
        preview.innerHTML = html;
    }

    setupExportButtons() {
        const exportButtons = document.querySelectorAll('.export-btn');
        
        exportButtons.forEach(button => {
            button.addEventListener('click', () => {
                const format = button.dataset.format;
                this.simulateExport(format);
            });
        });
    }
    
    showIntegrationModal() {
        // Show modal after a short delay to let users see the interface first
        setTimeout(() => {
            document.getElementById('integrationModal').classList.add('active');
        }, 2000);
    }
    
    hideIntegrationModal() {
        document.getElementById('integrationModal').classList.remove('active');
    }
    
    simulateExport(format) {
        const formats = {
            pdf: { name: 'PDF', icon: '📄', color: '#FF6B6B' },
            docx: { name: 'DOCX', icon: '📝', color: '#4ECDC4' },
            html: { name: 'HTML', icon: '🌐', color: '#45B7D1' },
            md: { name: 'Markdown', icon: '📋', color: '#95E1D3' }
        };
        
        const formatInfo = formats[format];
        
        // Show export simulation
        this.showNotification(
            `${formatInfo.icon} Generating ${formatInfo.name} export...`, 
            'info'
        );
        
        // Simulate processing delay
        setTimeout(() => {
            this.showNotification(
                `${formatInfo.icon} ${formatInfo.name} exported successfully! Ready for Ghost publishing.`,
                'success'
            );
            
            // Show integration benefit
            this.highlightIntegrationBenefit(format);
        }, 1500);
    }
    
    highlightIntegrationBenefit(format) {
        const benefits = {
            pdf: 'Perfect for gated content and premium subscriptions',
            docx: 'Ideal for editorial review and client approvals', 
            html: 'Ready for immediate publishing with Ghost themes',
            md: 'Pure markdown for version control and Git integration'
        };
        
        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach(card => {
            const cardText = card.querySelector('p').textContent;
            if (cardText.includes(benefits[format])) {
                card.style.borderColor = '#FF7A59';
                card.style.transform = 'scale(1.02)';
                
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.transform = '';
                }, 3000);
            }
        });
    }
    
    showPublishWorkflow() {
        this.showNotification('🚀 Preparing encrypted content for Ghost publishing...', 'info');
        
        // Simulate encryption and publishing workflow
        setTimeout(() => {
            this.showNotification('🔒 Content encrypted with zero-knowledge protection', 'success');
            
            setTimeout(() => {
                this.showNotification('📤 Publishing to Ghost with enhanced security...', 'info');
                
                setTimeout(() => {
                    this.showNotification('✅ Published successfully with QET encryption!', 'success');
                }, 1000);
            }, 1000);
        }, 1000);
    }

    saveDraft() {
        const title = document.querySelector('.title-input').value;
        const content = document.getElementById('qetEditor').value;
        
        // Save to localStorage
        localStorage.setItem('qet-ghost-draft', JSON.stringify({
            title: title,
            content: content,
            timestamp: new Date().toISOString()
        }));

        this.showNotification('💾 Draft saved successfully!', 'success');
    }

    togglePreview() {
        const editor = document.querySelector('.qet-editor');
        const preview = document.querySelector('.qet-preview');
        const wrapper = document.querySelector('.editor-wrapper');

        if (wrapper.style.gridTemplateColumns === '1fr') {
            wrapper.style.gridTemplateColumns = '1fr 1fr';
            editor.style.display = 'block';
            this.showNotification('👁️ Preview mode: Split view', 'info');
        } else {
            wrapper.style.gridTemplateColumns = '1fr';
            editor.style.display = 'none';
            this.showNotification('👁️ Preview mode: Full screen', 'info');
        }
    }

    showPublishOptions() {
        this.showNotification('📅 Choose publish date and time...', 'info');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.ghost-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `ghost-notification ghost-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    scheduleDemo() {
        this.showNotification('📅 Redirecting to demo scheduling...', 'info');
        // In a real implementation, this would open a calendar link
        setTimeout(() => {
            window.open('mailto:qandetech@gmail.com?subject=QET%20Ghost%20Integration%20Demo%20Request', '_blank');
        }, 1000);
    }

    viewDocumentation() {
        this.showNotification('📚 Opening integration documentation...', 'info');
        // In a real implementation, this would open documentation
        setTimeout(() => {
            alert('Integration Documentation:\n\n' +
                  '1. Zero-Knowledge Encryption\n' +
                  '2. Professional Export Formats\n' +
                  '3. Offline-First Architecture\n' +
                  '4. Ghost API Integration\n' +
                  '5. Security Best Practices\n\n' +
                  'For full documentation, contact: qandetech@gmail.com');
        }, 500);
    }
}

// Initialize demo when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GhostIntegrationDemo();
});

