AFRAME.registerComponent("bullets", {
    init: function(){
        this.shootBullet();
    },
    shootBullet: function(){
        window.addEventListener("keydown", (e)=>{
            if (e.key === "q" || e.key === "Q"){
                var bullet = document.createElement("a-entity");

                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1
                });
                bullet.setAttribute("material", {
                    color: `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
                });

                bullet.setAttribute("visible", true);
                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: 0
                });

                var cameraRig = document.querySelector("#camera-rig");
                const {x, y, z} = cameraRig.getAttribute("position");
                bullet.setAttribute("position", { x:x, y:y+3, z:z });

                var camera3D = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera3D.getWorldDirection(direction);
                bullet.setAttribute("velocity", direction.multiplyScalar(-20));

                bullet.addEventListener("collide", this.removeBullet);

                var scene = document.querySelector("#scene");
                scene.appendChild(bullet);

                var sound = document.querySelector("#shoot");
                sound.components.sound.playSound();
            }
        });
    },
    removeBullet: function(e){
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        if (elementHit.id.includes("ogre")){
            element.removeEventListener("collide", this.shootBullet);

            var scene = document.querySelector("#scene");
            scene.removeChild(element);
            scene.removeChild(elementHit);

            var element = document.querySelector("#monsters");
            var count = element.getAttribute("text").value;
            var monsters = parseInt(count);
            monsters-=1;

            element.setAttribute("text", {value: monsters})

            if (monsters <= 0){
                var text = document.querySelector("#gameover");
                text.setAttribute("text", {value: "LEVEL COMPLETE"});
                text.setAttribute("visible", true);
            }
        }
    }
});