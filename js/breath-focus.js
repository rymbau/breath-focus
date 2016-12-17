var breathFocus = (function () {
    var breathInterval = null;
    var breathTime = 5;

    var breathContent = document.getElementsByClassName("breath-content")[0];
    var timerSelect = document.getElementById("timerSelect");
    var start = document.getElementById("start");
    var increase = document.getElementById("increase");
    var decrease = document.getElementById("decrease");
    var minutes = document.getElementById("minutes");
    var countdown = document.getElementById("countdown");

    window.onload = function () {
        init();
    };

    function init() {
        document.body.style.webkitAnimationPlayState = "paused";
        breathContent.style.webkitAnimationPlayState = "paused";

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
            timerSelect.classList.add("fade-out");
            countdown.classList.add("fade-in");
            startTimer(breathTime * 60);
            document.body.style.webkitAnimationPlayState = "running";
            breathContent.style.webkitAnimationPlayState = "running";

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
                timerSelect.classList.remove("fade-out");
                countdown.classList.remove("fade-in");
                document.body.style.webkitAnimationPlayState = "paused";
                breathContent.style.webkitAnimationPlayState = "paused";
            }
        }

        breathTimer();
        breathInterval = setInterval(breathTimer, 1000);
    }
})();