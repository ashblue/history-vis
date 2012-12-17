define(
	[
		'controllers/scene',
		'lib/tween'
	],
	function(
		scene,
		Tween
	) {
		var TRANSITION_TIME = 2000;

		var Line = function( articleFrom, articleTo ) {
			this.articleFrom = articleFrom;
			this.articleTo = articleTo;

			var x1 = articleFrom.sphere.mesh.position.x;
			var x2 = articleTo.sphere.mesh.position.x;
			var y1 = articleFrom.sphere.mesh.position.y;
			var y2 = articleTo.sphere.mesh.position.y;
			var z1 = articleFrom.sphere.mesh.position.z;
			var z2 = articleTo.sphere.mesh.position.z;

			var material = new THREE.LineBasicMaterial({
				color: 0x0000FF,
				opacity: 0.3,
				lineWidth: 2
			});

			var geometry = new THREE.Geometry();

			this.start = new THREE.Vector3( x1, y1, z1  );
			this.end = new THREE.Vector3( x1, y1, z1  );

			geometry.vertices.push( this.start, this.end );

			this.segment = new THREE.Line( geometry, material );

			this.tweenX = new Tween( x1, x2 - x1, TRANSITION_TIME, 'quadInOut' );
			this.tweenY = new Tween( y1, y2 - y1, TRANSITION_TIME, 'quadInOut' );

			scene.ref.add(this.segment);
console.log('added line:', this);
		};

		Line.prototype.update = function() {
			this.end.x = this.tweenX.getValue();
			this.end.y = this.tweenY.getValue();
			this.segment.geometry.verticesNeedUpdate = true;
		};

		return Line;
	}
);
