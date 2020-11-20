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

        `);


        })
    )

}
document.addEventListener("DOMContentLoaded", function() {
    const loaderText = document.getElementById("loading");
    loaderText.style.display = "block";
    // Your code to run since DOM is loaded and ready
    fetch("https://api.spaceXdata.com/v3/launches?limit=100")
        .then(res => res.json())
        .then(spaceData => {
            loaderText.style.display = "none";
            renderHtml(spaceData)
         });
});


function filterByLaunchYear(launchYear = '', launchSuccess = ''){
    const loaderText = document.getElementById("loading");
    const params = new URLSearchParams({
        launch_year: launchYear,
        launch_success: launchSuccess,
      });
    const rocketLaunches = document.getElementById('rocketLaunches');
    rocketLaunches.innerHTML = "";
    loaderText.style.display = "block";
    fetch(`https://api.spaceXdata.com/v3/launches?limit=100&${params}`)
    .then(res => res.json())
    .then(spaceData => {
        loaderText.style.display = "none";
        renderHtml(spaceData)
     });
}