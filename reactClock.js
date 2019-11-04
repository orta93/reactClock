$.fn.reactClock = function() {
    var clock = $(this);
    runClock(clock);
    setInterval(() => {
        runClock(clock);
    },1000);
};

function runClock(clock){
    clock.each(function (){
        if($(this).data('date') === ''){
            return;
        }

        var h = 0;
        var i = 0;

        var date = $(this).data('date').split('-');
        var y = date[0];
        var m = date[1] !== undefined ? date[1]-1 : 0;
        var d = date[2] !== undefined ? date[2] : 0;

        var tz = $(this).data('tz');

        var time = $(this).data('time').split(':');

        if(time.length === 2){
            h = time[0] !== undefined ? time[0] : 0;
            i = time[1] !== undefined ? time[1] : 0;
        }

        var target = new Date(y, m, d, h, i);
        if (tz !== '') {
            target = setTz(target, tz);
        }

        var today = new Date();

        var dif = target.getTime() - today.getTime();

        var notYet = dif > 0;

        dif = Math.floor(dif / 1000);

        var days = lessThanZero(Math.floor(dif/86400),notYet);

        dif = dif - (parseInt(days) * 86400);
        var hours = lessThanZero(Math.floor(dif/3600),notYet);

        dif = dif - (parseInt(hours) * 3600);
        var minutes = lessThanZero(Math.floor(dif/60),notYet);

        var seconds = lessThanZero(dif - (parseInt(minutes) * 60),notYet);

        var txt = days +' '+ hours +' '+ minutes +' '+ seconds;

        var times = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }

        if($(this).data('type') !== ''){
            switch ($(this).data('type')){
                case 'd':
                    txt = days;
                    break;
                case 'h':
                    txt = hours;
                    break;
                case 'i':
                    txt = minutes;
                    break;
                case 's':
                    txt = seconds;
                    break;
                default:break;
            }
        }
        $(this).html(txt).css('display', canSee($(this), times));
    });
}

function canSee(element, times) {
    var display = element.css('display');
    if (element.data('min') !== undefined) {
        var item = '';
        var lapse = element.data('min').split(':');
        switch (lapse[0]) {
            case 'd':
                item = times.days;
                break;
            case 'h':
                item = times.hours;
                break;
            case 'i':
                item = times.minutes;
                break;
            case 's':
                item = times.seconds;
                break;
        }

        if (item !== '' && parseInt(item) > parseInt(lapse[1])) {
            display = 'none';
        } else {
            display = 'block';
        }
    }
    return display;
}

function lessThanZero(number, notYey) {
    if(number < 10){
        number = '0' + number;
    }
    if (!notYey) {
        return '00';
    }
    return number;
}

function setTz(date, tz) {
    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: tz
    }));

    var diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() + diff);
}