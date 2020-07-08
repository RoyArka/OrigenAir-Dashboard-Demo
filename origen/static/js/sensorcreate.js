function convert(degree) {
    var x;
    if (degree == "C") {
      x = document.getElementById("c").value * 9 / 5 + 32;
      document.getElementById("f").value = Math.round(x);
    } else {
      x = (document.getElementById("f").value -32) * 5 / 9;
      document.getElementById("c").value = Math.round(x);
    }
}   

function convert2(degree) {
    var y;
    if (degree == "A") {
      y = document.getElementById("a").value * 9 / 5 + 32;
      document.getElementById("b").value = Math.round(y);
    } else {
      y = (document.getElementById("b").value -32) * 5 / 9;
      document.getElementById("a").value = Math.round(y);
    }
}   


