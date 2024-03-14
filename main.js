const {app, Tray, Menu} = require('electron');
const path = `${__dirname}/icon.png`;
const {WebClient} = require('@slack/web-api');

let tray;

app.on('ready', () => {
    const menu = new Menu.buildFromTemplate([{
        label: '勤務開始します',
        click: () => {
            sendMessage('勤務開始します')
        }
    }, {
        label: '休憩します',
        click: () => {
            sendMessage('休憩します')
        }
    }, {
        label: '戻りました',
        click: () => {
            sendMessage('戻りました')
        }
    }, {
        label: '勤務終了します',
        click: () => {
            sendMessage('勤務終了します')
        }
    }, {
        label: 'exit',
        role: 'quit'
    }]);

    app.dock.hide();

    tray = new Tray(path);
    tray.setContextMenu(menu);
});

function sendMessage(message) {
    const date = new Date();
    const d = new Intl.DateTimeFormat("ja-jp", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);

    // replace your settings
    let param_channel = '#channel'
    let param_thread_ts = '1234567890.123456'
    let param_token = 'xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    let user_name = 'your bot name'
    let icon_url = 'https://ca.slack-edge.com/xxxxxxxxxxxxxxxxxxxxxxxx'
    let data = {
        token: param_token,
        channel: param_channel,
        username: user_name,
        icon_url: icon_url,
        text: message + ' ' + d,
        thread_ts: param_thread_ts,
    }

    console.log(data)

    const web = new WebClient(param_token);

    (async () => {
        const result = await web.chat.postMessage(data);
        console.log(`Successfully send message ${result.ts} in conversation ${param_channel}`);
    })();
}