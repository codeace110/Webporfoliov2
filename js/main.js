const username = 'codeace110';
const pinnedReposContainer = document.getElementById('pinned-repos');

fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
  .then(response => response.json())
  .then(data => {
    const pinnedRepos = data.filter(repo => repo.homepage);

    // Create HTML elements for each pinned repository
    for (let i = 0; i < 6; i += 2) {
      const colElement = document.createElement('div');
      colElement.className = 'col';

      for (let j = i; j < i + 2; j++) {
        if (j < pinnedRepos.length) {
          const repo = pinnedRepos[j];
          const repoElement = document.createElement('div');
          repoElement.className = 'repo-card';
          repoElement.innerHTML = `
        
            <h3>${repo.name}</h3>
            <p><strong>Forks:</strong> ${repo.forks}</p>
            <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
            <p><a href="${repo.homepage}" target="_blank">Visit</a></p>
            <p><a href="${repo.html_url}" target="_blank">Repository</a></p>
            
          `;
          colElement.appendChild(repoElement);
        }
      }

      pinnedReposContainer.appendChild(colElement);
    }
  })
  .catch(error => {
    console.error('Error fetching pinned repositories:', error);
  });
