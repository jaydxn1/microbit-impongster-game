input.onButtonPressed(Button.A, function () {
    if (bar_x > 0 && in_game == true) {
        radio.sendString("left")
        led.unplot(bar_x + 1, 4)
        bar_x = bar_x - 1
        led.plot(bar_x, 4)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (game_state < 4) {
        if (in_game == false) {
            game_state += 1
            basic.showNumber(game_state)
            radio.sendString("ready")
        }
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "left") {
        led.unplot(bar_x + 1, 4)
        bar_x = bar_x - 1
        led.plot(bar_x, 4)
    } else if (receivedString == "right") {
        led.unplot(bar_x, 4)
        bar_x = bar_x + 1
        led.plot(bar_x + 1, 4)
    } else if (receivedString == "ready") {
        if (game_state < 4 && in_game == false) {
            game_state += 1
            basic.showNumber(game_state)
        }
    } else if (receivedString == "reset_state") {
        game_state = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (bar_x < 3 && in_game == true) {
        radio.sendString("right")
        led.unplot(bar_x, 4)
        bar_x = bar_x + 1
        led.plot(bar_x + 1, 4)
    }
})
let ball_dy = 0
let ball_dx = 0
let ball_y = 0
let ball_x = 0
let interval_step = 0
let interval = 0
let point = 0
let in_game = false
let bar_x = 0
let game_state = 0
game_state = 0
radio.sendString("reset_state")
basic.showIcon(IconNames.SmallDiamond)
basic.pause(100)
basic.showIcon(IconNames.Diamond)
basic.pause(100)
basic.pause(100)
basic.showIcon(IconNames.Target)
basic.forever(function () {
    radio.setGroup(130)
    radio.sendNumber(0)
    if (game_state == 4) {
        point = 0
        interval = 500
        interval_step = 10
        ball_x = 3
        ball_y = 4
        ball_dx = -1
        ball_dy = -1
        bar_x = 0
        basic.showString("GO!")
        led.plot(ball_x, ball_y)
        led.plot(bar_x, 4)
        led.plot(bar_x + 1, 4)
        in_game = true
        while (in_game) {
            if (ball_x + ball_dx > 4) {
                ball_dx = ball_dx * -1
            } else if (ball_x + ball_dx < 0) {
                ball_dx = ball_dx * -1
            }
            if (ball_y + ball_dy < 0) {
                ball_dy = ball_dy * -1
            } else if (ball_y + ball_dy > 3) {
                if (led.point(ball_x + ball_dx, ball_y + ball_dy)) {
                    ball_dy = ball_dy * -1
                    point = point + 1
                    if (interval - interval_step >= 0) {
                        interval = interval - interval_step
                    }
                } else {
                    in_game = false
                }
            }
            if (in_game) {
                led.plot(ball_x + ball_dx, ball_y + ball_dy)
                led.unplot(ball_x, ball_y)
                ball_x = ball_x + ball_dx
                ball_y = ball_y + ball_dy
                basic.pause(interval)
            } else {
                game.setScore(point)
                game.gameOver()
            }
        }
    }
})
