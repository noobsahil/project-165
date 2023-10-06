AFRAME.registerComponent("player-movement", {
    init: function(){
        this.walk();
    },
    walk: function(){
        window.addEventListener("keydown", e=>{
            var key = e.key;
            if (
                key === "w" || key === "W" ||
                key === "a" || key === "A" ||
                key === "s" || key === "S" ||
                key === "d" || key === "D"
            ){
                var sound = document.querySelector("#step");
                sound.components.sound.playSound();
            }
        })
    }
});