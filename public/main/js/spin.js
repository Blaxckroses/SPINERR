function startSpin() {
    var voucher_val = $("input[name=voucher]").val();
    var username_val = $("input[name=username]").val();

    // Direct validation for username and voucher
    if (username_val !== "riduan" || voucher_val !== "riduan") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User ID or Voucher Code is incorrect!'
        });
        return;
    }

    if (username_val.length <= 0 || voucher_val.length <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User ID or Voucher Code is empty!'
        });
        return;
    }

    // Disable the buttons to prevent multiple clicks
    $("button[name=start]").attr('disabled', 'disabled');
    $("button[name=history]").attr('disabled', 'disabled');

    // Simulate the spin without any server-side verification
    setTimeout(function () {
        theWheel.stopAnimation(false);
        theWheel.rotationAngle = 2;
        theWheel.draw();

        theWheel.animation.spins = 5;

        // Simulate random segment selection
        let segmentNumber = Math.floor(Math.random() * theWheel.segments.length) + 1;  // Choose a random segment
        let stopAt = theWheel.getRandomForSegment(segmentNumber);
        theWheel.animation.stopAngle = stopAt;

        // Start the wheel animation
        theWheel.startAnimation();

        // After the spin ends, show the "You Win!" popup
        setTimeout(function () {
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: 'You Win! Enjoy your prize!'
            });
        }, theWheel.animation.duration);  // Ensure popup appears after spin finishes
    }, 200);

    // Optionally, simulate a history confirmation (you can skip this part)
    $(data).load('main/confirm?username=' + username_val + '&voucher=' + voucher_val);
}
