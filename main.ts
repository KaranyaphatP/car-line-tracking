function Forward () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, speedcar)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, speedcar)
}
function Turn_Right () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, speedcar)
}
function Turn_Left () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, speedcar)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
}
radio.onReceivedValue(function (name, value) {
    if (name == "engine") {
        running = value
    }
    if (name == "speed") {
        speedcar = value
    }
})
function Stop () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
}
let Right = 0
let Left = 0
let Direction2 = 0
let Front = 0
let running = 0
let speedcar = 0
radio.setGroup(147)
basic.showIcon(IconNames.Target)
speedcar = 500
basic.forever(function () {
    if (running == 0) {
        basic.showIcon(IconNames.No)
        led.stopAnimation()
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            running = 1
        }
    }
})
basic.forever(function () {
    if (Front == 1) {
        Direction2 = 0
    } else {
        if (Left == 0 && Right == 0) {
            Direction2 = 1
        }
        if (Left == 1 && Right == 0) {
            Direction2 = 3
        }
        if (Left == 0 && Right == 1) {
            Direction2 = 2
        }
        if (Left == 1 && Right == 1) {
            Direction2 = 0
        }
    }
})
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P2) > 500) {
        Front = 0
    } else {
        Front = 1
    }
})
basic.forever(function () {
    if (running == 1) {
        basic.showIcon(IconNames.Yes)
        led.stopAnimation()
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            running = 0
        }
    }
})
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) > 300) {
        Left = 1
    } else {
        Left = 0
    }
})
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) > 300) {
        Right = 1
    } else {
        Right = 0
    }
})
basic.forever(function () {
    if (Direction2 == 0) {
        if (running == 1) {
            Stop()
        }
    } else if (Direction2 == 1) {
        if (running == 1) {
            Forward()
        }
    } else if (Direction2 == 2) {
        if (running == 1) {
            Turn_Right()
        }
    } else if (Direction2 == 3) {
        if (running == 1) {
            Turn_Left()
        }
    } else {
    	
    }
})
basic.forever(function () {
    serial.writeValue("Front", pins.analogReadPin(AnalogPin.P2))
    serial.writeValue("Left", pins.analogReadPin(AnalogPin.P0))
    serial.writeValue("Right", pins.analogReadPin(AnalogPin.P1))
    serial.writeValue("Direction", Direction2)
    serial.writeValue("Running", running)
})
