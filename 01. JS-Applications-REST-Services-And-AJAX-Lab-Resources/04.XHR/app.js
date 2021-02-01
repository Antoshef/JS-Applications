function loadRepos() {
   
   const url = `https://api.github.com/users/Antoshef/repos`;
   const httpRequest = new XMLHttpRequest();
   
   httpRequest.addEventListener('loadend', function() {
      let response = JSON.parse(this.responseText);
      console.log(response);
      document.getElementById('res').innerHTML = response.map(x => `<li><a href="${x.url}" target="_blank">${x.name}</li>`).join('');
   })

   httpRequest.open('GET', url);
   httpRequest.send();
}