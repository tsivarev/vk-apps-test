import React, {Component} from 'react';
import {FormLayout, Group, List, ListItem, Panel, PanelHeader, Textarea, View} from '@vkontakte/vkui';
import * as VKConnect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

export default class App extends Component {

    componentWillMount() {
        VKConnect.subscribe(function (e) {
            e = e.detail;
            let type = e['type'];
            if (['VKWebAppUpdateInfo', 'VKWebAppUpdateInsets', 'VKWebAppUpdateConfig'].indexOf(type) === -1) {
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
            "VKWebAppClose",
            "VKWebAppOpenQR",
            "VKWebAppGetPersonalCard",
            "VKWebAppSetViewSettings",
        ];
    }

    render() {
        return (
            <View activePanel="main">
                <Panel id="main">
                    <PanelHeader>
                        VK Connect Test
                    </PanelHeader>
                    <Group title="Data">
                        <FormLayout>
                            <Textarea id='data' placeholder='{"method": "users.get", "params": {}}'/>
                        </FormLayout>
                    </Group>

                    <Group title="Response">
                        <FormLayout>
                            <Textarea id='response'/>
                        </FormLayout>
                    </Group>

                    <Group title="Event type">
                        <List>
                            {
                                this.events.map(function (eventName) {
                                    return (
                                        <ListItem onClick={() => {
                                            let data = {};
                                            try {
                                                let input = document.getElementById('data').value;
                                                if (input.length > 0) {
                                                    data = JSON.parse(input);
                                                }

                                                VKConnect.send(eventName, data);
                                            } catch (e) {
                                                alert(e);
                                            }
                                        }
                                        }>
                                            {eventName}
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                    </Group>
                </Panel>
            </View>
        );
    }
}
