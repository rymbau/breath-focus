var breathFocus = (function () {
    var breathInterval = null;
    var breathTime = 5;
    var stateInterval = null;

    var breathContent = document.getElementsByClassName("breath-content")[0];
    var timerSelect = document.getElementById("timerSelect");
    var start = document.getElementById("start");
    var increase = document.getElementById("increase");
    var decrease = document.getElementById("decrease");
    var minutes = document.getElementById("minutes");
    var countdown = document.getElementById("countdown");
    var breathMsg = document.getElementById("breathMsg");
    var message = "Get yourself comfortable and start breathing when ready";

    window.onload = function () {
        init();
    };

    function init() {
        document.body.style.webkitAnimationPlayState = "paused";
        document.body.style.animationPlayState = "paused";
        breathContent.style.webkitAnimationPlayState = "paused";
        breathContent.style.animationPlayState = "paused";

        breathMsg.textContent = message;

        decrease.addEventListener("click", function () {
            if (breathTime > 1) {
                breathTime--;
            }
            minutes.textContent = breathTime.toString();
        });

        increase.addEventListener("click", function () {
            breathTime++;
            minutes.textContent = breathTime.toString();
        });

        start.addEventListener("click", function () {

            breathMsg.textContent = "Breath In";
            updateClass(breathMsg, "fade-in", "breath-msg");
            breathMsg.style.webkitAnimationPlayState = "running";
            breathMsg.style.animationPlayState = "running";

            stateInterval = setInterval(function () {
                breathMsg.textContent = (breathMsg.textContent === "Breath Out") ? "Breath In" : "Breath Out";
            }, 5000);

            updateClass(timerSelect, "fade-in", "fade-out");
            updateClass(countdown, "fade-out", "fade-in");

            startTimer(breathTime * 60);
            document.body.style.webkitAnimationPlayState = "running";
            document.body.style.animationPlayState = "running";
            breathContent.style.webkitAnimationPlayState = "running";
            breathContent.style.animationPlayState = "running";

        });
    }

    function startTimer(duration) {
        var timer = duration, minutes, seconds;

        function breathTimer() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countdown.textContent = (minutes + ":" + seconds);

            if (--timer < 0) {
                clearInterval(breathInterval);
                clearInterval(stateInterval);

                updateClass(timerSelect, "fade-out", "fade-in");
                updateClass(countdown, "fade-in", "fade-out");
                breathMsg.textContent = message;

                document.body.style.webkitAnimationPlayState = "paused";
                document.body.style.animationPlayState = "paused";
                breathContent.style.webkitAnimationPlayState = "paused";
                breathContent.style.animationPlayState = "paused";
                breathMsg.style.webkitAnimationPlayState = "paused";
                breathMsg.style.animationPlayState = "paused";
            }
        }

        breathTimer();
        breathInterval = setInterval(breathTimer, 1000);
    }

    function updateClass(target, removeClass, addClass) {
        target.classList.remove(removeClass);
        target.classList.add(addClass);
    }
})();