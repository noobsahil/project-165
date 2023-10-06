AFRAME.registerComponent("ogre-bullets", {
    init: function () {
        setInterval(this.shootBullet, 2000);
    },
    shootBullet: function () {
        var els = document.querySelectorAll(".ogre");

        for (var i = 0; i < els.length; i++) {
            var ogreBullet = document.createElement("a-entity");

            ogreBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.5,
            });

            ogreBullet.setAttribute("material", {src: "./assets/fireball.png"});

            var pos = els[i].getAttribute("position")

            ogreBullet.setAttribute("position", {
                x: pos.x + 1.5,
                y: pos.y + 3.5,
                z: pos.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(ogreBullet);

            var ogre = els[i].object3D;
            var player = document.querySelector("#collider").object3D;

            var pos1 = new THREE.Vector3();
            var pos2 = new THREE.Vector3();
            
            player.getWorldPosition(pos1);
            ogre.getWorldPosition(pos2);

            var direction = new THREE.Vector3();
            direction.subVectors(pos1, pos2).normalize();

            ogreBullet.setAttribute("velocity", direction.multiplyScalar(10));
            ogreBullet.setAttribute("dynamic-body", {mass:0, shape:"sphere"});

            var countLife = document.querySelector("#lives");
            var countLifeInt = parseInt(countLife.getAttribute("text").value);

            ogreBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "collider") {
                    if (countLifeInt > 0){
                        countLifeInt-=1;
                        countLife.setAttribute("text", {value: countLifeInt});
                    }
                    if (countLifeInt <= 0){
                        var text = document.querySelector("#gameover");
                        text.setAttribute("visible", true)
                        
                        var ogre = document.querySelectorAll(".ogre")
                        for (var i=0; i<ogre.length; i++){
                            scene.removeChild(ogre[i]);
                        }
                    }
                }
            });

        }
    },

});