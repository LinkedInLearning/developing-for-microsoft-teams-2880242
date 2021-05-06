// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes
} = require('botbuilder');

const { imageSearch, imageName, imageCategory } = require('./imageSearch');


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
        const searchQuery = query.parameters[0].value;
        var imageFiles = imageSearch(searchQuery);
        const attachments = [];
        
        imageFiles.forEach(imageFile => {
            //const imageUrl = "https://searchmsg.loca.lt/public/thumbnails/" + imageFile;
            const imageUrl = "https://www.picturematic.com/dist/thumbnails/" + imageFile;

            const myAdaptiveCard = {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "TextBlock",
                        "size": "Medium",
                        "weight": "Bolder",
                        "text": imageCategory(imageFile)
                    },
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": imageUrl,
                                        "size": "Large"
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
                                        "text": imageName(imageFile),
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
            const preview = CardFactory.heroCard(imageName(imageFile)); // Preview cards are optional for Hero card. You need them for Adaptive Cards.
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

