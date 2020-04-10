window.addEventListener("load", () =>
{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let tempSection = document.querySelector(".temperature");
    let tempSpan = document.querySelector('.temperature span');
    let ikona = document.querySelector(".ikona");
    let ikonka= document.createElement('img');
    let temperaturaK = 0;
    let temperaturaC = 0;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>
        {
          
            long = position.coords.longitude.toString();
            lat =  position.coords.latitude.toString();          

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}2&lon=${long}&appid=bb8495e0139d7f39913badeb0e0534a7`;
            
            fetch(api)
            .then(response =>
            {
                return response.json();
            })
            .then(data  =>
            {
               
                let {description, icon} = data.weather[0];
                let {temp, humidity} = data.main; 
                let miasto = data.name;
                             
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent =  description;  
                locationTimezone.textContent= miasto;
               
                
                ikonka.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                ikona.appendChild(ikonka);  
                ikona.appendChild(document.createElement("img"));
                
                temperaturaC = (temp - 273.15) ; 
                temperaturaK = temp;
                temperatureDegree.textContent = Math.floor(temperaturaK);

               

            });
        });      
    }

    locationTimezone.addEventListener('click', () =>
    {
        let newLocation = prompt("Podaj nowe miejsce:");
        
        
        if(newLocation == null || newLocation == '' )
        {
            alert("Nie podano miasta");
        }
        else
        {
            const apiMsc = `http://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=bb8495e0139d7f39913badeb0e0534a7`;

            fetch(apiMsc)
                .then(response =>
                {
                    return response.json();
                })
                .then(data  =>
                {
                
                    let {description, icon} = data.weather[0];
                    let {temp, humidity} = data.main; 
                    let miasto = data.name;

                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent =  description;  
                    locationTimezone.textContent= miasto;

                    ikonka.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    ikona.appendChild(ikonka);  
                    ikona.appendChild(document.createElement("img"));
                    
                    temperaturaC = (temp - 273.15) ; 
                    temperaturaK = temp;
                    temperatureDegree.textContent = Math.floor(temperaturaK);
    
                });
        }

    });  

    tempSection.addEventListener('click', () =>
    {
        if(tempSpan.textContent === "K")
        {
            tempSpan.textContent = "°C";
            temperatureDegree.textContent = Math.floor(temperaturaC);
        }
        else
        {
            tempSpan.textContent = "K";
            temperatureDegree.textContent = temperaturaK;
        }
    });  

});

