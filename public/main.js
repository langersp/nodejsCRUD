(function() {

	document.getElementById('carsTable').addEventListener('click', (el) => {
		//PUT request updating car to sold
		if (el.target && el.target.matches('.car__button')) {
			axios({
			  method:'PUT',
			  url:'/api/cars/'+el.target.dataset.id,
			  data: JSON.stringify({isSold: true}),
			  headers: {
	            'Content-Type': 'application/json',
	        }})
			  .then(function(res) {
			    console.log("updated", res.data);
			    let isSoldEl = el.target.parentNode.parentNode.children[5];
			    isSoldEl.innerHTML = res.data.isSold;
			    el.target.style.display = "none";
			  })
		}
	
	});

})();
