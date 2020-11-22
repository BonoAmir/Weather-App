window.addEventListener("load",()=>{
let long;
let lat;
let temp=document.querySelector(".temp-degree");
let loc=document.querySelector(".location-timezone");
let desc=document.querySelector(".description");
let icon=document.querySelector("#icon");
let iconDescription;


let degreeMode=document.querySelector(".degree-section");
let tempMessurment=document.querySelector("span");





if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
        lat =position.coords.latitude;
        long=position.coords.longitude;
      
            const proxy="https://cors-anywhere.herokuapp.com/"
            const api=`${proxy}api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=10&appid=32f40531d71f72b4eb8cf70e77ae89d4&units=imperial`;
     
            fetch(api).then(response =>{
                return response.json();
     
            })
            .then(data=>{
                
                let tempResponse=data.list[0].main.temp;
                const locaResponse=data.list[0].name;
                const descResponse=data.list[0].weather[0].description;
                iconDescription=data.list[0].weather[0].main;
                console.log(iconDescription );
     
                
               temp.textContent=tempResponse;
               desc.textContent=descResponse;
               loc.textContent=locaResponse;
               icon=setIcon(iconDescription);
               console.log(iconDescription);
     
     
               degreeMode.addEventListener("click",function(){
                if(tempMessurment.textContent=="C")
                {
                    temp.textContent= tempResponse;
                    tempMessurment.textContent="F";
                   
                }
                else{
                temp.textContent=Math.floor((tempResponse - 32) * (5 / 9));
                tempMessurment.textContent="C";
                
                }
                
            
            })
      
     
     
     
            })
            
        
       
 
        
     });
  
    
}



function setIcon(description){
    const skycons = new Skycons({"color": "white"});
    skycons.play();

    if(description =="Clear"){

        return    skycons.set("icon", Skycons.CLEAR_DAY);
    }
    else if(description=="Clouds" ){

        return  skycons.set("icon", Skycons.CLOUDY);
    }
    else if(description=="Rain" ){

        return  skycons.set("icon", Skycons.RAIN);
        
    }
    else if(description=="Snow"){

        return  skycons.set("icon", Skycons.SNOW);
    }
    else if(description=="Fog"){

        return  skycons.set("icon", Skycons.FOG);
    }
    else {

        return  skycons.set("icon", Skycons.PARTLY_CLOUDY_DAY);
    }
}
})