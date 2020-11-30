function renderHtml(spaceData){
    return (
        spaceData.map(station => {
            rocketLaunches.innerHTML += (`<div class="column">
            <div class="center">
              <img src="${station.links.mission_patch_small}" />
            </div>
            <p class="text-blue">${station.mission_name} #${station.flight_number}</p>
            <p class="bold mb-0">Mission Ids:</p>
             <ul> 
                ${station.mission_id.map(id => `<li>${id}</li>`)}
            </ul>
            <p class="bold">Launch Year: ${station.launch_year}</p>
            <p class="bold">Successful Launch: ${station.launch_success}</p>
            <p class="bold">Successful Landing: ${(station.rocket.first_stage.cores[0].land_success)}</p>

        `);


        })
    )

}

document.addEventListener("DOMContentLoaded", function() {
    selectedYears = [];
    apiUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
    const loaderText = document.getElementById("loading");
    loaderText.style.display = "block";
    // Your code to run since DOM is loaded and ready
    fetch(apiUrl)
        .then(res => res.json())
        .then(spaceData => {
            console.log(spaceData);
            loaderText.style.display = "none";
            renderHtml(spaceData)
         });
});


function filterByLaunchYear(event, launchYear = '', launchSuccess = '', landingSuccess = ''){
    if(launchYear){
        if (selectedYears.indexOf(launchYear) === -1) {
            selectedYears.push(launchYear);
          }
          else {
            selectedYears.indexOf(launchYear) !== -1 && selectedYears.splice(selectedYears.indexOf(launchYear), 1)
          }
    }
    event.classList.toggle('btn-active');
    const loaderText = document.getElementById("loading");
    const params = new URLSearchParams({
        launch_year: selectedYears,
        launch_success: (launchSuccess !== '') ? launchSuccess : '',
        land_success: (landingSuccess !== '') ? landingSuccess : '',
      });
    const rocketLaunches = document.getElementById('rocketLaunches');
    rocketLaunches.innerHTML = "";
    loaderText.style.display = "block";
    fetch(`${apiUrl}&${params}`)
    .then(res => res.json())
    .then(spaceData => {
        loaderText.style.display = "none";
        renderHtml(spaceData)
     });
}

 