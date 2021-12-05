
function displayTime() {
    var time = moment().format('hhmm');
    $('input[type="time"]').html(time);
}
$(document).ready(function() {
    displayTime();
});