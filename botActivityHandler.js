// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes
} = require('botbuilder');

class BotActivityHandler extends TeamsActivityHandler {
    constructor() {
        super();
    }

    /* Building a messaging extension search command is a two step process.
        (1) Define how the messaging extension will look and be invoked in the client.
            This can be done from the Configuration tab, or the Manifest Editor.
            Learn more: https://aka.ms/teams-me-design-search.
        (2) Define how the bot service will respond to incoming search commands.
            Learn more: https://aka.ms/teams-me-respond-search.
        
        NOTE:   Ensure the bot endpoint that services incoming messaging extension queries is
                registered with Bot Framework.
                Learn more: https://aka.ms/teams-register-bot. 
    */

    // Invoked when the service receives an incoming search query.
    async handleTeamsMessagingExtensionQuery(context, query) {
        const axios = require('axios');
        const querystring = require('querystring');

        const searchQuery = query.parameters[0].value;
        const response = await axios.get(`http://registry.npmjs.com/-/v1/search?${querystring.stringify({ text: searchQuery, size: 8 })}`);

        const attachments = [];
        response.data.objects.forEach(obj => {

            const myAdaptiveCard = {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "size": "Medium",
                        "weight": "Bolder",
                        "text": obj.package.name
                    },
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "items": [
                                    {
                                        "type": "Image",
                                        "style": "Person",
                                        "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                                        "size": "Small"
                                    }
                                ],
                                "width": "auto"
                            },
                            {
                                "type": "Column",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "spacing": "None",
                                        "text": obj.package.description,
                                        "isSubtle": true,
                                        "wrap": true
                                    }
                                ],
                                "width": "stretch"
                            }
                        ]
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3"
            };



            const card = CardFactory.adaptiveCard(myAdaptiveCard);
            const preview = CardFactory.heroCard(obj.package.name); // Preview cards are optional for Hero card. You need them for Adaptive Cards.
            //preview.content.tap = { type: 'invoke', value: { description: obj.package.description } };
            const attachment = { ...card, preview };
            attachments.push(attachment);
        });

        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: attachments
            }
        };
    }

    // Invoked when the user selects an item from the search result list returned above.
    async handleTeamsMessagingExtensionSelectItem(context, obj) {
        return {
            composeExtension: {
                type: 'result',
                attachmentLayout: 'list',
                attachments: [CardFactory.thumbnailCard(obj.description)]
            }
        };
    }

    /* Messaging Extension - Unfurling Link */
    handleTeamsAppBasedLinkQuery(context, query) {
        const attachment = CardFactory.thumbnailCard('Thumbnail Card',
            query.url,
            ['https://raw.githubusercontent.com/microsoft/botframework-sdk/master/icon.png']);

        const result = {
            attachmentLayout: 'list',
            type: 'result',
            attachments: [attachment]
        };

        const response = {
            composeExtension: result
        };
        return response;
    }
    /* Messaging Extension - Unfurling Link */
}

module.exports.BotActivityHandler = BotActivityHandler;

