document.addEventListener('DOMContentLoaded', () => {
    // Page Loader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
                setTimeout(() => {
            if(loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                loader.style.transition = 'opacity 0.5s ease, visibility 0s linear 0.5s';
            }
            // Initialize animations that depend on assets being loaded, if any
            initAmbientAnimations();
            
            // Auto-start cozy ambience
            setTimeout(() => {
                attemptAutoplay();
            }, 500);
            
            // Show hearts hint toast
            setTimeout(() => {
                showHeartsHintToast();
            }, 3000);
            
            // Ensure all content is visible after loader finishes
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    if (!el.classList.contains('is-visible')) {
                        el.classList.add('is-visible');
                    }
                });
            }, 600);
        }, 2000); // Extended to 2 seconds minimum
    });

    // Header & Navigation Scroll Behavior
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    if (header) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
                header.classList.remove('visible');
            } else {
                if (scrollTop < scrollThreshold || lastScrollTop - scrollTop > scrollThreshold || scrollTop === 0) {
                    header.classList.add('visible');
                }
            }
            if (scrollTop < header.offsetHeight / 2) {
                header.classList.add('visible');
            } else if (scrollTop > header.offsetHeight && scrollTop < 200 && lastScrollTop < scrollTop) {
                if (!header.classList.contains('visible')) { 
                    // no op
                } else if (scrollTop > 150) {
                    header.classList.remove('visible');
                }
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
        if (window.pageYOffset < header.offsetHeight / 2 || window.pageYOffset < 50) {
            header.classList.add('visible');
        }
    }

    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuIcon && navMenu) {
        mobileMenuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuIcon.classList.toggle('active');
        });
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuIcon.classList.remove('active');
                }
            });
        });
    }

    // Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('#navbar .nav-menu li .nav-link');
    if (sections.length > 0 && navLi.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            navLi.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
            if (!current && pageYOffset < sections[0].offsetTop) {
                const homeLink = document.querySelector('#navbar .nav-menu li .nav-link[href="#hero"]');
                if (homeLink) homeLink.classList.add('active');
            }
        });
    }

    // Scroll-Triggered Animations
    function initScrollAnimations() {
        // Add .animate-on-scroll to sections for a basic reveal
        document.querySelectorAll('.content-section, .full-viewport-section').forEach(section => {
            section.classList.add('animate-on-scroll');
        });

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.05, rootMargin: '50px' }); // More sensitive detection

            animatedElements.forEach(el => {
                observer.observe(el);
                // Make hero section visible immediately
                if (el.id === 'hero') {
                    el.classList.add('is-visible');
                }
            });
        } else {
            // Fallback if IntersectionObserver isn't supported - show all content
            animatedElements.forEach(el => {
                el.classList.add('is-visible');
            });
        }
    }
    
    // Initialize scroll animations after a brief delay
    setTimeout(initScrollAnimations, 100);


    // Ambient Animations (Fireflies & Floating Leaves)
    function initAmbientAnimations() {
        createFireflies(20); // Create 20 fireflies in the #recent-magic section
        createFloatingLeaves(8); // Create 8 floating leaves across the body
        createHeroLeaves(6); // Create 6 leaves specifically for hero background
        addSparkleEffects(); // Add sparkle effects to interactive elements
        enhanceArtCardAnimations(); // Add special hover effects for art cards
    }

    function createFireflies(count) {
        const recentMagicSection = document.getElementById('recent-magic');
        if (!recentMagicSection) return;

        for (let i = 0; i < count; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            firefly.style.left = `${Math.random() * 100}%`;
            firefly.style.top = `${Math.random() * 100}%`;
            firefly.style.animationDelay = `${Math.random() * 3}s`; // Randomize start time
            firefly.style.animationDuration = `${2 + Math.random() * 3}s`; // Randomize duration
            recentMagicSection.appendChild(firefly);
        }
    }

    function createFloatingLeaves(count) {
        const body = document.body;
        for (let i = 0; i < count; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('floating-leaf');
            leaf.style.left = `${Math.random() * 100}vw`;
            leaf.style.top = `${Math.random() * -50}px`; // Start off-screen top
            leaf.style.animationDelay = `${Math.random() * 10}s`;
            leaf.style.animationDuration = `${8 + Math.random() * 7}s`;
            // Randomly assign different looks if you have multiple leaf styles
            // if (Math.random() > 0.5) leaf.classList.add('leaf-style-2'); 
            body.appendChild(leaf);
        }
    }

    function createHeroLeaves(count) {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        for (let i = 0; i < count; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('hero-floating-leaf');
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${Math.random() * 100}%`; // Position within hero section
            leaf.style.animationDelay = `${Math.random() * 15}s`;
            leaf.style.animationDuration = `${12 + Math.random() * 8}s`; // Slower, more peaceful
            heroSection.appendChild(leaf);
        }
    }

    // Add sparkle effects to navigation and buttons
    function addSparkleEffects() {
        const sparkleElements = document.querySelectorAll('.nav-link, .btn, .art-card h3');
        
        sparkleElements.forEach(element => {
            element.addEventListener('mouseenter', createSparkleTrail);
            element.addEventListener('mousemove', createSparkleTrail);
        });
    }

    function createSparkleTrail(e) {
        if (Math.random() > 0.7) { // Only create sparkles 30% of the time for subtlety
            const sparkle = document.createElement('div');
            sparkle.className = 'nav-sparkle';
            sparkle.style.position = 'absolute';
            sparkle.style.left = (e.pageX - 2) + 'px';
            sparkle.style.top = (e.pageY - 2) + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.backgroundColor = 'var(--golden-accent)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.boxShadow = '0 0 6px var(--golden-accent)';
            sparkle.style.animation = 'sparkle-fade 0.8s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 800);
        }
    }

    // Enhanced art card animations
    function enhanceArtCardAnimations() {
        const artCards = document.querySelectorAll('.art-card');
        
        artCards.forEach((card, index) => {
            // Add special animations based on card type
            if (index === 1) { // Sweet Creatures card - add subtle doodle wiggle
                const visual = card.querySelector('.art-card-visual');
                if (visual) {
                    card.addEventListener('mouseenter', () => {
                        visual.style.animation = 'doodle-wiggle 0.5s ease-in-out infinite alternate';
                    });
                    card.addEventListener('mouseleave', () => {
                        visual.style.animation = '';
                    });
                }
            }
            
            if (index === 2) { // Portfolio card - portfolio "opens" effect
                const visual = card.querySelector('.art-card-visual');
                if (visual) {
                    card.addEventListener('mouseenter', () => {
                        visual.style.transform = 'perspective(200px) rotateX(10deg) scale(1.05)';
                        visual.style.transition = 'transform 0.3s ease';
                    });
                    card.addEventListener('mouseleave', () => {
                        visual.style.transform = '';
                    });
                }
            }
        });
    }

    // Easter Eggs
    // Romantic Hidden Hearts 💕
    const hearts = document.querySelectorAll('.hidden-heart');
    const heartSections = ['#hero', '#artistic-worlds', '#recent-magic', '#merch-corner', '#contact'];
    const heartImages = ['heart.png', 'heart2.png', 'heart3.png'];
    
    hearts.forEach((heart, index) => {
        const targetSection = document.querySelector(heartSections[index % heartSections.length]);
        if (targetSection) {
            heart.style.position = 'absolute';
            
            // More random and smart positioning to avoid header
            const isHeroSection = targetSection.id === 'hero';
            const topOffset = isHeroSection ? 120 + Math.random() * 200 : 60 + Math.random() * 100;
            const sideOffset = Math.random() > 0.5 ? 
                `${20 + Math.random() * 150}px` : 
                `${20 + Math.random() * 150}px`;
            
            heart.style.top = `${topOffset}px`;
            
            // Randomly choose left or right side
            if (Math.random() > 0.5) {
                heart.style.right = sideOffset;
                heart.style.left = 'auto';
            } else {
                heart.style.left = sideOffset;
                heart.style.right = 'auto';
            }
            
            // Add random heart PNG image
            const randomHeartImage = heartImages[Math.floor(Math.random() * heartImages.length)];
            const heartImg = document.createElement('img');
            heartImg.src = `images/${randomHeartImage}`;
            heartImg.alt = 'Hidden Heart';
            heartImg.style.width = '100%';
            heartImg.style.height = '100%';
            heartImg.style.pointerEvents = 'none'; // Ensure clicks go to parent
            heart.appendChild(heartImg);
            
            targetSection.appendChild(heart);
            
            heart.addEventListener('click', (e) => {
                e.preventDefault();
                const message = heart.getAttribute('data-message');
                showLoveMessage(message);
            });
        }
    });

    function showLoveMessage(message) {
        // Remove any existing love messages
        const existingMessage = document.querySelector('.love-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const loveMessage = document.createElement('div');
        loveMessage.className = 'love-message';
        loveMessage.innerHTML = `${message}<br><br><small>❤️ Click anywhere to close ❤️</small>`;
        
        document.body.appendChild(loveMessage);
        
        // Close message when clicking anywhere
        const closeMessage = () => {
            loveMessage.style.animation = 'love-message-appear 0.3s reverse';
            setTimeout(() => {
                if (loveMessage.parentNode) {
                    loveMessage.remove();
                }
            }, 300);
            document.removeEventListener('click', closeMessage);
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMessage);
        }, 500);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (loveMessage.parentNode) {
                closeMessage();
            }
        }, 5000);
    }

    // Hidden Mushrooms & Sparkle Burst (original easter eggs)
    const mushrooms = document.querySelectorAll('.hidden-mushroom');
    const mainFooter = document.getElementById('main-footer');

    mushrooms.forEach(mushroom => {
        if(mainFooter){
            mushroom.style.position = 'absolute';
            mushroom.style.bottom = `${10 + Math.random() * 30}px`;
            mushroom.style.left = `${Math.random() * 200}px`;
            mainFooter.appendChild(mushroom);
        }

        mushroom.addEventListener('click', (e) => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle-burst');
            sparkle.style.left = `${e.clientX - 5}px`;
            sparkle.style.top = `${e.clientY - 5 + window.scrollY}px`;
            
            document.body.appendChild(sparkle);
            console.log("Sparkle burst! You found a mushroom!");
            setTimeout(() => {
                sparkle.remove();
            }, 500);
        });
    });

    // Cozy Ambient Sound Control
    const ambientToggle = document.getElementById('ambient-toggle');
    const ambientAudio = document.getElementById('ambient-audio');
    
    if (ambientToggle && ambientAudio) {
        ambientToggle.addEventListener('click', () => {
            if (ambientAudio.paused) {
                // Start playing the cozy ambient audio
                ambientAudio.volume = 0.4; // Nice gentle volume
                ambientAudio.play().then(() => {
                    ambientToggle.classList.add('active');
                    ambientToggle.textContent = '🏠 Playing Cozy Vibes';
                    console.log('🔥 Cozy cabin ambience started - so relaxing! 🌧️');
                }).catch(error => {
                    console.log('Audio play failed:', error);
                    ambientToggle.textContent = '🏠 Audio Unavailable';
                });
            } else {
                // Pause the ambient audio
                ambientAudio.pause();
                ambientToggle.classList.remove('active');
                ambientToggle.textContent = '🏠 Cozy Ambience';
            }
        });

        // Handle audio end (though it's looped, just in case)
        ambientAudio.addEventListener('ended', () => {
            ambientToggle.classList.remove('active');
            ambientToggle.textContent = '🏠 Cozy Ambience';
        });

        // Handle any audio errors
        ambientAudio.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            ambientToggle.textContent = '🏠 Audio Error';
            ambientToggle.disabled = true;
        });
    }

    // Cursor Effects
    const bodyElement = document.body;
    const clickableBrushElements = document.querySelectorAll('.nav-link, .btn, .art-card, .merch-card, .mobile-menu-icon, #sound-toggle');
    const artPieceElements = document.querySelectorAll('.art-piece img');

    // Default cursor with sparkle trail (applied via CSS to body.cursor-sparkle-trail)
    // bodyElement.classList.add('cursor-sparkle-trail'); // If you want it by default

    clickableBrushElements.forEach(el => {
        el.addEventListener('mouseenter', () => bodyElement.classList.add('clickable-element-brush'));
        el.addEventListener('mouseleave', () => bodyElement.classList.remove('clickable-element-brush'));
    });

    artPieceElements.forEach(el => {
        el.addEventListener('mouseenter', () => bodyElement.classList.add('art-piece-magnify'));
        el.addEventListener('mouseleave', () => bodyElement.classList.remove('art-piece-magnify'));
    });

    // Subtle Parallax for Hero Background (if hero has a background image)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Make sure it only applies when hero is somewhat in view
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
            }
        });
    }

    // Auto-start cozy ambience
    function attemptAutoplay() {
        const ambientAudio = document.getElementById('ambient-audio');
        const ambientToggle = document.getElementById('ambient-toggle');
        
        if (ambientAudio && ambientToggle) {
            ambientAudio.volume = 0.3; // Gentle volume for autoplay
            
            ambientAudio.play().then(() => {
                // Autoplay succeeded!
                ambientToggle.classList.add('active');
                ambientToggle.textContent = '🏠 Playing Cozy Vibes';
                console.log('🔥 Cozy cabin ambience auto-started! 🌧️');
            }).catch(error => {
                // Autoplay blocked by browser - show helpful message
                console.log('Autoplay blocked - showing user hint');
                setTimeout(() => {
                    showAudioHintToast();
                }, 1000);
            });
        }
    }

    // Toast Management System
    class ToastManager {
        constructor() {
            this.toasts = [];
            this.container = this.createContainer();
        }

        createContainer() {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
            return container;
        }

        show(type, content, duration = 0, dismissible = true, customClickHandler = null) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            toast.innerHTML = `
                <div class="toast-content">${content}</div>
                ${dismissible ? '<button class="toast-dismiss">×</button>' : ''}
            `;

            // Add to toasts array
            this.toasts.push(toast);
            
            // Add to DOM
            this.container.appendChild(toast);
            
            // Position all toasts
            this.updatePositions();
            
            // Animate in after a brief delay
            setTimeout(() => {
                toast.classList.add('show');
            }, 50);

            // Set up dismiss functionality
            if (dismissible) {
                const dismissBtn = toast.querySelector('.toast-dismiss');
                dismissBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.dismiss(toast);
                });
                
                // Click anywhere on toast to dismiss (unless custom handler provided)
                if (customClickHandler) {
                    toast.addEventListener('click', (e) => {
                        customClickHandler(e, toast, this);
                    });
                } else {
                    toast.addEventListener('click', () => {
                        this.dismiss(toast);
                    });
                }
            }

            // Auto-dismiss (only if duration is explicitly set > 0)
            if (duration > 0) {
                setTimeout(() => {
                    this.dismiss(toast);
                }, duration);
            }

            return toast;
        }

        dismiss(toast) {
            if (!this.toasts.includes(toast)) return;

            // Remove from array
            const index = this.toasts.indexOf(toast);
            this.toasts.splice(index, 1);

            // Animate out
            toast.classList.add('dismissing');
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
                // Update positions of remaining toasts
                this.updatePositions();
            }, 300);
        }

        updatePositions() {
            let currentTop = 20;
            
            this.toasts.forEach((toast, index) => {
                if (!toast.classList.contains('dismissing')) {
                    toast.style.top = `${currentTop}px`;
                    currentTop += toast.offsetHeight + 10; // 10px gap between toasts
                }
            });
        }
    }

    // Initialize toast manager
    const toastManager = new ToastManager();

    // Test function for demo purposes (can be called from console)
    window.testToasts = function() {
        toastManager.show('hearts', '💕 First toast message!', 0); // 0 = no auto-dismiss
        setTimeout(() => {
            toastManager.show('audio', '🏠 Second toast appears!', 0);
        }, 1000);
        setTimeout(() => {
            toastManager.show('success', '✨ Third toast stacks nicely!', 0);
        }, 2000);
    };

    // Show hint about clickable hearts
    function showHeartsHintToast() {
        toastManager.show('hearts', `
            💖 <strong>Psst, Kate!</strong><br>
            Look for the hearts and click them... 💫
        `);
    }

    // Show hint about audio if autoplay failed
    function showAudioHintToast() {
        toastManager.show('audio', `
            🏠 <strong>Click for cozy vibes!</strong><br>
            Your browser blocked autoplay 💫
        `, 0, true, (e, toast, manager) => {
            // Custom click handler to start audio
            const ambientAudio = document.getElementById('ambient-audio');
            const ambientToggle = document.getElementById('ambient-toggle');
            
            if (ambientAudio && ambientToggle) {
                ambientAudio.volume = 0.4;
                ambientAudio.play().then(() => {
                    ambientToggle.classList.add('active');
                    ambientToggle.textContent = '🏠 Playing Cozy Vibes';
                    console.log('🔥 Cozy cabin ambience started from toast! 🌧️');
                    // Dismiss this toast after successfully starting audio
                    manager.dismiss(toast);
                }).catch(error => {
                    console.log('Audio play still failed:', error);
                    // Keep toast visible if audio still fails
                });
            }
        });
    }

    // Simple Guest Book Functionality (writes to text file)
    const submitButton = document.getElementById('submit-message');
    const guestName = document.getElementById('guest-name');
    const guestMessage = document.getElementById('guest-message');
    const messagesContainer = document.querySelector('.messages-container');

    if (submitButton && guestMessage && messagesContainer) {
        submitButton.addEventListener('click', async () => {
            const name = guestName.value.trim() || 'Anonymous Admirer';
            const message = guestMessage.value.trim();
            
            if (message.length < 5) {
                alert('Please write a longer message! ✨');
                return;
            }
            
            // Disable button while submitting
            submitButton.disabled = true;
            submitButton.textContent = '✨ Adding Magic... ✨';
            
            try {
                // Add message to page immediately for better UX
                const messageData = {
                    name: name,
                    message: message,
                    timestamp: new Date().toLocaleString()
                };
                addMessageToPage(messageData);
                
                // Clear form
                guestName.value = '';
                guestMessage.value = '';
                
                // Try to save to server (graceful fallback if unavailable)
                try {
                    const response = await fetch('/add-message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            message: message
                        })
                    });
                    
                    if (response.ok) {
                        showSuccessMessage('✨ Your magical message has been saved! ✨');
                    } else {
                        throw new Error('Server unavailable');
                    }
                } catch (serverError) {
                    // Server not available - but that's okay!
                    showSuccessMessage('💫 Your love note is here for Kate to see! 💫');
                    console.log('💕 Guest book working in display mode - Kate will see your message!');
                }
                
            } catch (error) {
                console.error('Error adding message:', error);
                showSuccessMessage('💫 Please try again! 💫');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.innerHTML = '✨ Leave Magic ✨';
            }
        });
        
        // Load any existing messages (from the simple text file approach)
        loadExistingMessages();
    }

    function addMessageToPage(messageData) {
        const messageElement = document.createElement('div');
        messageElement.className = 'guest-message';
        messageElement.innerHTML = `
            <div class="message-content">"${messageData.message}"</div>
            <div class="message-author">- ${messageData.name}</div>
        `;
        
        // Add to top of messages (most recent first)
        messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
    }

    function showSuccessMessage(text) {
        toastManager.show('success', `
            ✨ <strong>Success!</strong><br>
            ${text}
        `);
    }

    async function loadExistingMessages() {
        try {
            const response = await fetch('/get-messages');
            if (response.ok) {
                const result = await response.json();
                
                if (result.status === 'success' && result.messages) {
                    result.messages.forEach(msg => {
                        addMessageToPage({
                            name: msg.name,
                            message: msg.message,
                            timestamp: msg.timestamp
                        });
                    });
                }
            }
        } catch (error) {
            console.log('💕 Guest book ready for Kate\'s visitors! Leave a magical message! ✨');
            // Add a sample message to show how it works
            addMessageToPage({
                name: 'The Magic Web',
                message: 'Welcome to Kate\'s cozy corner! Leave a love note below and it will appear here for Kate to see. 💖',
                timestamp: new Date().toLocaleString()
            });
        }
    }

    // Lightbox functionality for artwork
    function initLightbox() {
        const lightbox = document.getElementById('artwork-lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        
        // Get all art pieces and hero image
        const artPieces = document.querySelectorAll('.art-piece');
        const heroImage = document.querySelector('.hero-illustration img');
        let currentIndex = 0;
        
        // Create array of artwork data
        const artworkData = [];
        
        // Add hero image first if it exists
        if (heroImage) {
            artworkData.push({
                src: heroImage.src,
                alt: heroImage.alt,
                title: 'Hero Artwork',
                description: 'Featured magical artwork by Cinnamonbred',
                element: heroImage.parentElement
            });
        }
        
        // Add all gallery pieces
        Array.from(artPieces).forEach((piece, index) => {
            const img = piece.querySelector('img');
            const caption = piece.querySelector('.art-caption');
            const title = caption ? caption.textContent.split('\n')[0].trim() : '';
            const description = caption ? caption.querySelector('.creation-date')?.textContent.trim() : '';
            
            artworkData.push({
                src: img.src,
                alt: img.alt,
                title: title,
                description: description,
                element: piece
            });
        });
        
        // Open lightbox function
        function openLightbox(index) {
            currentIndex = index;
            const artwork = artworkData[index];
            
            lightboxImage.src = artwork.src;
            lightboxImage.alt = artwork.alt;
            lightboxTitle.textContent = artwork.title;
            lightboxDescription.textContent = artwork.description || '';
            
            // Update navigation buttons
            lightboxPrev.disabled = currentIndex === 0;
            lightboxNext.disabled = currentIndex === artworkData.length - 1;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Trigger animation
            setTimeout(() => {
                lightbox.classList.add('show');
            }, 10);
        }
        
        // Close lightbox function
        function closeLightbox() {
            lightbox.classList.remove('show');
            
            setTimeout(() => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                lightboxImage.src = ''; // Clear image
            }, 300);
        }
        
        // Navigate function
        function navigate(direction) {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < artworkData.length) {
                openLightbox(newIndex);
            }
        }
        
        // Add click handlers to hero image
        if (heroImage) {
            heroImage.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(0); // Hero image is always index 0
            });
        }
        
        // Add click handlers to art pieces
        artPieces.forEach((piece, index) => {
            piece.addEventListener('click', (e) => {
                e.preventDefault();
                // Account for hero image if it exists
                const actualIndex = heroImage ? index + 1 : index;
                openLightbox(actualIndex);
            });
        });
        
        // Close button handler
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Navigation button handlers
        lightboxPrev.addEventListener('click', () => navigate(-1));
        lightboxNext.addEventListener('click', () => navigate(1));
        
        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'ArrowRight':
                    navigate(1);
                    break;
            }
        });
    }
    
    // Initialize lightbox
    initLightbox();

}); 