var img;
var change = 1;
var vehicles = [];
var histx = [];
var histy = [];

function preload() {
  img = loadImage("https://c1.staticflickr.com/1/660/31505144011_5a59015e53_o.jpg");
}

function Vehicle(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 1;
  this.angle = 20;
}

Vehicle.prototype.display = function() {
  //body
  noStroke();
  ellipse(this.x, this.y, 20, 20);
  //eye
  fill(0, 255, 255);
  ellipse(this.x + 3 * cos(this.angle), this.y + 3 * sin(this.angle), 3, 3);
}

Vehicle.prototype.move = function() {
  this.x = this.x + this.speed * cos(this.angle);
  this.y = this.y + this.speed * sin(this.angle);
}

Vehicle.prototype.senseLove = function() {
  
  //red
  fill(240, 10, 5);
  
  //slow down and turn away from brightness

  var sensor1 = brightness(get(this.x + 20 * cos(this.angle - 15), this.y + 20 * sin(this.angle - 15)));
  var sensor2 = brightness(get(this.x + 20 * cos(this.angle + 15), this.y + 20 * sin(this.angle + 15)));

  var diff = abs(sensor2 - sensor1);
  
  if(sensor2>=sensor1){
  var newSpeed = map(sensor2, 0, 255, 1.5, 0);
  }
  else{
    newSpeed = map(sensor1, 0, 255, 1.5, 0);
  }

  if (sensor2 > sensor1) {
    this.angle = this.angle - 10;
    this.speed = newSpeed;
  } else if (sensor2 < sensor1) {
    this.angle = this.angle + 10;
    this.speed = newSpeed;
  } else {
    this.speed = 1;
  }
}

Vehicle.prototype.senseLove2 = function() {
  
  //yellow
  fill(255, 240, 0);
  
  //slow down and turn towards brightness

  var sensor1 = brightness(get(this.x + 20 * cos(this.angle - 15), this.y + 20 * sin(this.angle - 15)));
  var sensor2 = brightness(get(this.x + 20 * cos(this.angle + 15), this.y + 20 * sin(this.angle + 15)));

  var diff = abs(sensor2 - sensor1);
  
  if(sensor2>=sensor1){
  var newSpeed = map(sensor2, 0, 255, 1.5, 0);
  }
  else{
    newSpeed = map(sensor1, 0, 255, 1.5, 0);
  }

  if (sensor2 > sensor1) {
    this.angle = this.angle + 10;
    this.speed = newSpeed;
  } else if (sensor2 < sensor1) {
    this.angle = this.angle - 10;
    this.speed = newSpeed;
  } else {
    this.speed = 1;
  }
}

Vehicle.prototype.randomStart = function() {
  //if they go offscreen, start again in a random position
  if (this.x < 0 || this.x > width) {
    this.x = random(10, width - 10);
  }
  if (this.y < 0 || this.y > height) {
    this.y = random(10, height - 10);
  }
}

Vehicle.prototype.middleStart = function() {
  if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
    this.x = width / 2;
    this.y = height / 2;
  }
}

function setup() {

  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < 12; i++) {
    vehicles.push(new Vehicle(100 - i, 100 + i));
    histx[i] = [];
    histy[i] = [];
  }
}

function draw() {
  image(img, 0, 0, windowWidth, windowHeight);
  
  for(var i = 0; i < vehicles.length/2; i++) {
    vehicles[i].display();
    vehicles[i].move();
    vehicles[i].senseLove();
  }
  for(var j = vehicles.length/2; j< vehicles.length; j++) {
    vehicles[j].display();
    vehicles[j].move();
    vehicles[j].senseLove2();
  }

  for (var i = 0; i < vehicles.length; i++) {
    
    if (change > 0) {
      vehicles[i].randomStart();
    } else {
      vehicles[i].middleStart();
    }

    histx[i].push(vehicles[i].x);
    histy[i].push(vehicles[i].y);
    
    
    for (var j = 0; j < histx[i].length; j++) {
      fill(0, 60);
      ellipse(histx[i][j], histy[i][j], 2, 2);
    }
  }
  
  //Switch between starting modes
  if (keyIsPressed) {
    change = change * (-1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
