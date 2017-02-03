var breathFocus = (function () {
    var breathInterval = null;
    var breathTime = 5;
    var stateInterval = null;

    var breathContent = document.getElementsByClassName("breath-content")[0];
    var start = document.getElementById("start");
    var settings = document.getElementById("settings");
    var settingsIcon = document.getElementById("settingsIcon");
    var increase = document.getElementById("increase");
    var decrease = document.getElementById("decrease");
    var minutes = document.getElementById("minutes");
    var countdown = document.getElementById("countdown");
    var breathMsg = document.getElementById("breathMsg");
    var message = "Get yourself comfortable and start breathing when ready";
    var mainContent = document.getElementById("mainContent");
    var sidebar = document.getElementById("sidebar");

    window.onload = function () {
        init();
    };

    function init() {
        document.body.style.WebkitAnimationPlayState = "paused";
        document.body.style.animationPlayState = "paused";
        breathContent.style.WebkitAnimationPlayState = "paused";
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
            var msgInterval = (document.getElementById("slow").checked) ? 7500 : 5000;
            var breathSpeed = (document.getElementById("slow").checked) ? "15s" : "10s";
            breathContent.style.WebkitAnimationDuration = breathSpeed;
            breathContent.style.animationDuration = breathSpeed;

            breathMsg.textContent = "Breath In";
            stateInterval = setInterval(function () {
                breathMsg.textContent = (breathMsg.textContent === "Breath Out") ? "Breath In" : "Breath Out";
            }, msgInterval);

            updateClass(start, "fade-in", "fade-out");
            updateClass(countdown, "fade-out", "fade-in");

            startTimer(breathTime * 60);
            document.body.style.WebkitAnimationPlayState = "running";
            document.body.style.animationPlayState = "running";
            breathContent.style.WebkitAnimationPlayState = "running";
            breathContent.style.animationPlayState = "running";
        });

        settings.addEventListener("click", function () {
            mainContent.classList.toggle("isOpen");
            sidebar.classList.toggle("isOpen");
            settingsIcon.classList.toggle("icon-cog");
            settingsIcon.classList.toggle("icon-cancel");
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

                updateClass(start, "fade-out", "fade-in");
                updateClass(countdown, "fade-in", "fade-out");
                breathMsg.textContent = message;

                document.body.style.WebkitAnimationPlayState = "paused";
                document.body.style.animationPlayState = "paused";
                breathContent.style.WebkitAnimationPlayState = "paused";
                breathContent.style.animationPlayState = "paused";
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