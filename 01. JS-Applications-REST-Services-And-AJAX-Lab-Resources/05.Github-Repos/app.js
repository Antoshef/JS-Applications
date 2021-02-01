function loadRepos() {
	
	const userElement = document.getElementById('username');
	const reposElement = document.getElementById('repos');
	const url = `https://api.github.com/users/${userElement.value}/repos`;
	fetch(url)
	.then(res => res.json())
	.then(data => {
		reposElement.innerHTML += data.map(x => `<li><a href="${x.html_url}" target="_blank">${x.name}</li>`).join('');
	})
}