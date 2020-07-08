
// sensor creation page - replaces min and max threshhold selection
function myFunction() {
    var x = document.getElementById("sensorselection").value;
    console.log(x);
    // console.log("noway");
    if(x === "Temperature" || x === "Humidity"){
        // console.log("match");
        document.getElementById("sensormeasurement1").innerHTML = "<option value=celsius>C</option><option value=fahrenheit>F</option>";
        document.getElementById("sensormeasurement2").innerHTML = "<option value=celsius>C</option><option value=fahrenheit>F</option>";

        document.getElementById("sensorwarningmin").innerHTML = '<input type=text class="form-control form-control-lg" placeholder=Temp aria-label=Recipients usernamearia-describedby=basic-addon2>';
        document.getElementById("sensorwarningmax").innerHTML = '<input type=text class="form-control form-control-lg" placeholder=Temp aria-label=Recipients usernamearia-describedby=basic-addon2>';

    } else if(x === "Benzene" || x === "Chloroform" || x === "Carbon Dioxide"){
        // console.log("other");
        document.getElementById("sensormeasurement1").innerHTML = "<option value=ppm>PPM</option>";
        document.getElementById("sensormeasurement2").innerHTML = "<option value=ppm>PPM</option>";

        document.getElementById("sensorwarningmin").innerHTML = '<input type=text class="form-control form-control-lg" placeholder=Concentration aria-label=Recipients usernamearia-describedby=basic-addon2>';
        document.getElementById("sensorwarningmax").innerHTML = '<input type=text class="form-control form-control-lg" placeholder=Concentration aria-label=Recipients usernamearia-describedby=basic-addon2>';
    }
  }





