var ws;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

var accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzk2OTEiLCJpYXQiOjE3Mjg3OTAzNjIsImV4cCI6MTcyODc5NzU2Mn0.iHKdlib6yxRW3szYgJDUtcGtumJeTgIYa-l-NDDoSe8';

function connect() {
    ws = new WebSocket('wss://websocket.freshdawn.tech/text', accessToken); //'ws://localhost:8086/text'
    ws.onmessage = function (data) {
        showGreeting(data.data);
    }
    setConnected(true);
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    var data = JSON.stringify({
        'clid': '279691',
        'cmd': 3002,
        'type': 0,
        'data': {
            'sender': 'Nguyễn Nhị Long',
            'avatar': 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/449720247_10220881321621899_3786763890235069273_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Qvidm6H856sQ7kNvgH_djxL&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=AXUpU03WJchIDI0oxO1ubo4&oh=00_AYC9D7m8Ox4dhWQ4TgXJ-ypMlEeaHf_R_H4Xz3uqfpe4QQ&oe=670AB84C',
            'ulcCode': 'ulcCode-20241008',
            'clagGroupCode': 'BC5-35-G4-C2-29999',
            'content': $("#name").val()
        }
    })
    ws.send(data);
}

function joinRoom() {
    var data = JSON.stringify({
        'clid': '279691',
        'cmd': 3000,
        'type': 0,
        'data': {
            'roomId': 'ulcCode-20241008',
            'topicId': 'BC5-35-G4-C2-29999'
        }
    })
    ws.send(data);
}

function echo() {
    var data = JSON.stringify({
        'clid': '279691',
        'cmd': 2000,
        'type': 0,
        'data': 'hello world'
    })
    ws.send(data);
}

function showGreeting(message) {
    $("#greetings").append("<tr><td> " + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        joinRoom();
        sendName();
        echo();
    });
});

