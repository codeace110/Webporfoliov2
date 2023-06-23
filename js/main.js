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

 function showAlert() {
  alert("This project is private.");
}


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
      lastUpdate.textContent = `  Updated ${getTimeAgo(repository.updated_at)}..   `;
      lastUpdate.classList.add('last-update');
      card.appendChild(lastUpdate);
    
      const demoLink = document.createElement('a');
      demoLink.href = repository.homepage;
      demoLink.textContent = '  View Demo';
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
  };;


  /**Repository Search Script */

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
  .then(response => response.json())
  .then(data => {
    const repositories = data;
    displayRepositories(repositories);

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('input', handleSearch);

    function handleSearch(event) {
      event.preventDefault();
      const keyword = searchInput.value.toLowerCase();
      const filteredRepositories = repositories.filter(repository =>
        repository.name.toLowerCase().includes(keyword)
      );
      displayRepositories(filteredRepositories);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

function displayRepositories(repositories) {
  repositoriesContainer.innerHTML = '';

  repositories.forEach(repository => {
    const card = createRepositoryCard(repository);
    repositoriesContainer.appendChild(card);
  });
};;

/***github commits and update*/

const commitsContainer = document.getElementById('commits');
const paginationContainer = document.getElementById('pagination');
const commitsPerPage = 5;
let currentPage = 1;
let commitsData = [];

// Function to fetch the latest commits
function fetchLatestCommits() {
  fetch(`https://api.github.com/users/${username}/events`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch commits');
      }
      return response.json();
    })
    .then(data => {
      commitsData = data.filter(event => event.type === 'PushEvent');
      displayCommits(commitsData);
      displayPagination(commitsData.length);
    })
    .catch(error => {
      console.error('Error:', error);
      commitsContainer.textContent = 'Failed to fetch commits';
    });
}

// Call fetchLatestCommits initially
fetchLatestCommits();

// Periodically fetch the latest commits every 1 minute (adjust as needed)
setInterval(fetchLatestCommits, 60000);

function displayCommits(commits) {
  commitsContainer.innerHTML = '';

  const startIndex = (currentPage - 1) * commitsPerPage;
  const endIndex = startIndex + commitsPerPage;
  const commitsToDisplay = commits.slice(startIndex, endIndex);

  commitsToDisplay.forEach(commit => {
    const commitCard = createCommitCard(commit);
    commitsContainer.appendChild(commitCard);
  });
}

function createCommitCard(commit) {
  const commitCard = document.createElement('div');
  commitCard.classList.add('commit-card');

  const repoName = document.createElement('h4');
  const repoLink = document.createElement('a');
  repoLink.href = `https://github.com/${commit.repo.name}`;
  repoLink.textContent = commit.repo.name;
  repoName.appendChild(repoLink);
  commitCard.appendChild(repoName);

  const commitMessage = document.createElement('p');
  commitMessage.textContent = commit.payload.commits[0].message;
  commitCard.appendChild(commitMessage);

  const commitDate = document.createElement('span');
  const commitTime = new Date(commit.created_at);
  commitDate.textContent = commitTime.toDateString();
  commitCard.appendChild(commitDate);

  return commitCard;
}

function displayPagination(totalCommits) {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalCommits / commitsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.classList.add('pagination-button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayCommits(commitsData);
      updatePaginationButtons();
    });
    paginationContainer.appendChild(button);
  }

  updatePaginationButtons();
}

function updatePaginationButtons() {
  const buttons = paginationContainer.getElementsByTagName('button');

  for (let i = 0; i < buttons.length; i++) {
    if (i + 1 === currentPage) {
      buttons[i].classList.add('active');
    } else {
      buttons[i].classList.remove('active');
    }
  }

  buttons[0].disabled = currentPage === 1;
  buttons[buttons.length - 1].disabled = currentPage === buttons.length;
}

/***stars counter */
