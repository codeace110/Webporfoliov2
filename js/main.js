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
  });;


  /**search script */

  // function performSearch(event) {
  //   event.preventDefault(); // Prevent form submission

  //   const searchInput = document.getElementById('searchInput');
  //   const searchTerm = searchInput.value.trim(); // Get the search term and remove leading/trailing spaces

  //   if (searchTerm !== '') {
  //     // Perform search operation
  //     alert('Performing search for: ' + searchTerm);
  //     // You can customize the search logic here based on your requirements
  //   }
  // };;

  /**repo badge script */
/*repo badge script  |
 |                          |
 | repo badge script |      |
 |                          |
 | repo badge script        |
 */
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
  .then(response => response.json())
  .then(data => {
    // Get the total number of repositories
    const repoCount = data.length;

    // Update the badge with the repository count
    document.getElementById('repo-count').textContent = repoCount;
  })
  .catch(error => {
    console.error('Error:', error);
  });;



/*repositories page script  |
 |                          |
 | repositories page script |
 |                          |
 | repositories page script |
 */

  // Fetch repository data from GitHub API
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)

  const repositoriesContainer = document.getElementById('repositories');
  
   fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
    .then(response => response.json())
    .then(data => {
      data.forEach(repository => {
        const card = createRepositoryCard(repository);
        repositoriesContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
    function createRepositoryCard(repository) {
      const card = document.createElement('div');
      card.classList.add('repository-card');
    
      const name = document.createElement('h3');
      const repoLink = document.createElement('a');
      repoLink.href = repository.html_url;
      repoLink.textContent = repository.name;
      name.appendChild(repoLink);
      card.appendChild(name);
    
      const description = document.createElement('p');
      description.textContent = repository.description || 'No description provided.';
      card.appendChild(description);
    
      const language = document.createElement('span');
      language.textContent = repository.language || 'Unknown';
      language.classList.add('language');
      language.style.backgroundColor = getLanguageColor(repository.language);
      card.appendChild(language);
    
      const lastUpdate = document.createElement('span');
      lastUpdate.textContent = `Updated ${getTimeAgo(repository.updated_at)}`;
      lastUpdate.classList.add('last-update');
      card.appendChild(lastUpdate);
    
      const demoLink = document.createElement('a');
      demoLink.href = repository.homepage;
      demoLink.textContent = 'View Demo';
      demoLink.classList.add('demo-link');
      card.appendChild(demoLink);
    
      card.title = repository.updated_at; // Tooltip with past activity
    
      return card;
    }
    
  function getLanguageColor(language) {

    switch (language) {
      case 'JavaScript':
        return '#f1e05a';
      case 'Python':
        return '#3572A5';
      case 'HTML':
        return '#a60303';
      case 'Blade':
        return '#a62e03';
      case 'PHP':
        return '#9e03a6';
      default:
        return '#0350a6'; // Default color for unknown languages
    }
  }

  function getTimeAgo(updatedAt) {
    const currentTime = new Date();
    const updatedTime = new Date(updatedAt);
    const timeDiff = Math.abs(currentTime - updatedTime);
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  
    if (hoursDiff === 1) {
      return '1 hour ago';
    } else {
      return `${hoursDiff} hours ago`;
    }
  };
  
  
