const ApiKey ="b16fd1f3e4ae6e12b611cbde33ab53b7";
const url="https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWether(city) {
    const result = await fetch(url+city+`&appid=${ApiKey}`);
    console.log(result);
    let data = await result.json();
    console.log(data);

    // if(data.cod!=="200"){
    //     document.querySelector(".city").innerHTML=data.message;
    // }else{   
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.feels_like)+`° C`;
        document.querySelector(".humidity").innerHTML=data.main.humidity + `%<br> humidity`;
        document.querySelector(".wind").innerHTML=data.wind.speed + ` kmph<br>Wind Speed`;
        
        if(data.weather[0].main==='haze') document.querySelector(".weather-icon").innerHTML='<i class="fa-solid fa-smog fa-sm" style="color: #FFD43B;"></i>';
        
        document.querySelector(".wether-icon").src=`weather-app-img/images/${data.weather[0].main}.png`;
    // }   
}

searchBtn.addEventListener("click",()=>{
    checkWether(searchBox.value);
})

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault(); 
      searchBox.focus();
    }
});

searchBox.addEventListener("keydown", (event)=>{
    if(event.key==="Enter"){
        let city = searchBox.value;
        checkWether(city);
    }
    // console.log(checkWether(city));
})