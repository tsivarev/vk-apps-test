import React, { Component } from 'react';
import * as UI from '@vkontakte/vkui';
import * as VKConnect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

export default class App extends Component {

    componentWillMount() {
        VKConnect.subscribe(function(e) {
            e = e.detail;
            let type = e['type'];
            if (['VKWebAppUpdateInfo', 'VKWebAppUpdateInsets'].indexOf(type) === -1) {
                document.getElementById('response').value = JSON.stringify(e);
            }
        });
    }


    constructor(props) {
        super(props);

        this.events = [
            "VKWebAppGetAuthToken",
            "VKWebAppCallAPIMethod",
            "VKWebAppGetGeodata",
            "VKWebAppGetUserInfo",
            "VKWebAppGetPhoneNumber",
            "VKWebAppGetClientVersion",
            "VKWebAppOpenPayForm",
            "VKWebAppShare",
            "VKWebAppAllowNotifications",
            "VKWebAppDenyNotifications",
            "VKWebAppShowWallPostBox",
            "VKWebAppGetEmail",
            "VKWebAppAllowMessagesFromGroup",
            "VKWebAppJoinGroup",
            "VKWebAppOpenApp",
            "VKWebAppOpenQR",
        ];
    }

    render() {
        return (
            <UI.View activePanel="main">
                <UI.Panel id="main">
                    <UI.PanelHeader>
                        VK Connect Test
                    </UI.PanelHeader>
                    <UI.Group title="Data">
                        <UI.FormLayout>
                            <UI.Textarea id='data' placeholder='{"method": "users.get", "params": {}}' />
                        </UI.FormLayout>
                    </UI.Group>

                    <UI.Group title="Response">
                        <UI.FormLayout>
                            <UI.Textarea id='response' />
                        </UI.FormLayout>
                    </UI.Group>

                    <UI.Group title="Event type">
                        <UI.List>
                            {
                                this.events.map(function(eventName) {
                                    return (
                                        <UI.ListItem onClick={() => {
                                            let data = {};
                                            try {
                                                let input = document.getElementById('data').value;
                                                if (input.length > 0) {
                                                    data = JSON.parse(input);
                                                }

                                                VKConnect.send(eventName, data);
                                            } catch(e) {
                                                alert(e);
                                            }
                                        }
                                        }>
                                            {eventName}
                                        </UI.ListItem>
                                    );
                                })
                            }
                        </UI.List>
                    </UI.Group>
                </UI.Panel>
            </UI.View>
        );
    }
}