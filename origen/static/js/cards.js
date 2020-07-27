
//used for counting inactive/active sensors
function getSensorStatus() {
    var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/testorg/"
    total = 0;
    inactive = 0;
    active = 0;
    $.ajax({
      async: false,
      url: sensorApiUrl,
      method: "GET",
      data: {},
      success: function (data) {
          for(var key in data){
              total += 1;
              if(data[key].active == true){
                  active += 1;
              }
              else if (data[key].active == false){
                inactive += 1;
              }
              console.log(active)
              console.log(inactive)
              console.log(total)

              var activeCount = $("active-count")[0];
              activeCount.textContent = active;

              var inactiveCount = $("inactive-count")[0];
              inactiveCount.textContent = inactive;

              var totalCount = $("total-count")[0];
              totalCount.textContent = total;
              
          }
      }
    });
  }
  
  window.setInterval(function(){
    getSensorStatus()
  }, 5000);