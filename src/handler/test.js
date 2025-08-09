fetch('http://localhost:3000/users/123', {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));