var createSeat = function(initialX, initialY) {
	var rect = new Kinetic.Rect({
	  x: initialX,
	  y: initialY,
	  height: 30,
	  width: 30,
	  fill: "orange",
	  stroke: "black",
	  strokeWidth: 1
	});
	return rect;
};

var createDesk = function(paramX, paramY, paramRotation, name, leftseat, rightseat) {
	if (typeof(leftseat) === 'undefined') leftseat = false;
	if (typeof(rightseat) === 'undefined') rightseat = false;
	
	var desk = new Kinetic.Rect({
	  name: "table",
	  height: 80,
	  width: 180,
	  fill: "#00D2FF",
	  stroke: "black",
	  strokeWidth: 3
	});
	var group = new Kinetic.Group({
	  height: 80,
	  width: 180,
	  x: paramX,
	  y: paramY,
	  rotation: paramRotation * Math.PI / 180,
	  draggable: true
	});
	group.add(desk);

	group.leftseat = leftseat; // reinmergen
	if (leftseat != false) {
		var leftSeat = createSeat(30, 23);
		group.add(leftSeat);
	}
	group.rightseat = rightseat; // reinmergen
	if (rightseat != false) {
		var rightSeat = createSeat(120, 23);
		group.add(rightSeat);
	}
	
	group.on("click dragstart", function(e) {
		selectedDesk.set(this);
	});
	
	// Desk kopieren
	group.on("dblclick", function(e) {
		var newDesk = createDesk(this.getX() + 50,this.getY() + 30,this.getRotationDeg(), "new");
		this.getParent().add(newDesk);
		selectedDesk.set(newDesk);
	});

	group.setName(name);
	return group;
};