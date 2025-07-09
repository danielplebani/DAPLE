// public/main.js
fetch('/api/items')
  .then(res => res.json())
  .then(data => console.log(data));