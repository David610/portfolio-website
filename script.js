// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading spinner after a short delay to simulate loading
    setTimeout(() => {
        const avatarSpinner = document.querySelector('.animate-spin');
        if (avatarSpinner) {
            const avatarFallback = avatarSpinner.closest('.flex');
            if (avatarFallback) {
                // Create and append David's local profile image
                const img = document.createElement('img');
                // Using local profile.jpg image
                img.src = "profile.jpg";
                img.alt = "David Mkhitaryan";
                img.className = "h-full w-full object-cover rounded-xl";
                
                avatarFallback.innerHTML = '';
                avatarFallback.appendChild(img);
            }
        }
    }, 1500);

    // Handle language switching
    const languageSwitch = document.getElementById('language-switch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', function() {
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'index.html' || currentPage === '') {
                window.location.href = 'index_en.html';
            } else if (currentPage === 'index_en.html') {
                window.location.href = 'index.html';
            }
        });
    }

    // Command menu functionality (⌘J)
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
            e.preventDefault();
            
            // Check if command menu already exists
            let commandMenu = document.getElementById('command-menu');
            
            if (commandMenu) {
                // Close the menu if it's already open
                commandMenu.remove();
                return;
            }
            
            // Create command menu
            commandMenu = document.createElement('div');
            commandMenu.id = 'command-menu';
            commandMenu.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            
            const menuContent = document.createElement('div');
            menuContent.className = 'bg-white rounded-lg w-full max-w-md p-4 shadow-xl';
            
            // Menu header
            const header = document.createElement('div');
            header.className = 'flex justify-between items-center mb-4';
            header.innerHTML = `
                <h3 class="text-lg font-semibold">Command Menu</h3>
                <button id="close-menu" class="text-gray-500 hover:text-gray-800">&times;</button>
            `;
            
            // Search input
            const searchInput = document.createElement('div');
            searchInput.className = 'mb-4';
            searchInput.innerHTML = `
                <input type="text" placeholder="Befehl oder Suche eingeben..." 
                       class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            `;
            
            // Get current language
            const currentPage = window.location.pathname.split('/').pop();
            const isEnglish = currentPage === 'index_en.html';
            
            // Menu items with correct language
            const menuItems = document.createElement('div');
            menuItems.className = 'space-y-2';
            
            if (isEnglish) {
                menuItems.innerHTML = `
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🔍</span>
                        <span>Search</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🖨️</span>
                        <span>Print Resume</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">📧</span>
                        <span>Contact</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🌙</span>
                        <span>Dark Mode</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🇩🇪</span>
                        <span>Language: English</span>
                    </div>
                `;
                // Update placeholder text for English
                searchInput.querySelector('input').placeholder = "Enter command or search...";
                header.querySelector('h3').textContent = "Command Menu";
            } else {
                menuItems.innerHTML = `
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🔍</span>
                        <span>Suchen</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🖨️</span>
                        <span>Lebenslauf Drucken</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">📧</span>
                        <span>Kontakt</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🌙</span>
                        <span>Dark Mode</span>
                    </div>
                    <div class="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        <span class="mr-2">🇬🇧</span>
                        <span>Sprache: Deutsch</span>
                    </div>
                `;
            }
            
            // Assemble menu
            menuContent.appendChild(header);
            menuContent.appendChild(searchInput);
            menuContent.appendChild(menuItems);
            commandMenu.appendChild(menuContent);
            
            // Add to DOM
            document.body.appendChild(commandMenu);
            
            // Focus the input
            setTimeout(() => {
                const input = commandMenu.querySelector('input');
                if (input) input.focus();
            }, 0);
            
            // Close on click outside or close button
            commandMenu.addEventListener('click', function(e) {
                if (e.target === commandMenu || e.target.id === 'close-menu') {
                    commandMenu.remove();
                }
            });
            
            // Handle menu item clicks
            const items = menuItems.querySelectorAll('div');
            items.forEach((item, index) => {
                item.addEventListener('click', function() {
                    switch(index) {
                        case 0: // Search
                            alert(isEnglish ? 'Search function would open here' : 'Suchfunktion würde hier geöffnet');
                            break;
                        case 1: // Print
                            window.print();
                            break;
                        case 2: // Contact
                            window.location.href = 'mailto:david.mkhit@mailfence.com';
                            break;
                        case 3: // Dark Mode
                            document.body.classList.toggle('dark-mode');
                            break;
                        case 4: // Language
                            // Switch language
                            if (isEnglish) {
                                window.location.href = 'index.html';
                            } else {
                                window.location.href = 'index_en.html';
                            }
                            break;
                    }
                    commandMenu.remove();
                });
            });
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 