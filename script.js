document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');

    // Function to render projects
    function renderProjects() {
        projectsGrid.innerHTML = ''; // Clear existing content

        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            // Create tags HTML
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${tagsHtml}
                </div>
            `;

            // Add click event to open project link
            card.addEventListener('click', () => {
                if (project.link && project.link !== '#') {
                    window.open(project.link, '_blank');
                }
            });

            projectsGrid.appendChild(card);
        });
    }

    // Initial render
    renderProjects();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
