// Required Variables
const cityInput = document.getElementsByTagName("form")[0];
const Infodivs = document.getElementsByClassName("info");
const pop = document.getElementById("pop");
let tempUnit;
let pressUnit;
let speedUnit;

// Pop up display functionality
setTimeout(() => {
    pop.style.opacity = "1";
    setTimeout(() => {
        pop.style.opacity = "0";
    }, 6000);
}, 500);

// event which triggers data Request
cityInput.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
        document.getElementsByTagName("form")[0].submit();
        data();
        const unitValue = document.getElementsByTagName("select")[0].value;
       if(unitValue === "standard" || unitValue === "unit"){setUnit("K","Pa","m/s",unitValue)}
       else if(unitValue === "metric"){setUnit("C","Pa","km/h",unitValue)}
       else{setUnit("F","PSI","mph",unitValue)}
    }
    
})

// function to get data and to display it on webpage
function data(){
    setTimeout(() => {
    fetch("Data.json")
    .then(res => {
        return res.json();
    }).then(data => {
        
        if(data.cod === '404'){
            alert("Enter valid City Name or Select Proper Unit");
        }else{
                Infodivs[0].innerText = data.name;
                Infodivs[1].innerText = data.main.temp+"    "+tempUnit;
                Infodivs[2].innerText = data.weather[0].description;
                Infodivs[3].innerText = data.main.feels_like+"    "+tempUnit;
                Infodivs[4].innerText = data.main.temp_min+"    "+tempUnit;
                Infodivs[5].innerText = data.main.temp_max+"    "+tempUnit;
                Infodivs[6].innerText = data.main.pressure+"    "+pressUnit;
                Infodivs[7].innerText = data.main.humidity+"    g/kg";
                Infodivs[8].innerText = data.wind.speed+"    "+speedUnit;
            }
            document.location.href="#datasec";
        })
    }, 2500);
    
}

//  Function to sets approproate Unit
function setUnit(temp,press,speed,u){
    tempUnit = temp;
    pressUnit = press;
    speedUnit = speed;


}




