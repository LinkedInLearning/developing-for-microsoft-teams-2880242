// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    TurnContext,
    MessageFactory,
    TeamsActivityHandler,
    CardFactory,
    ActionTypes
} = require('botbuilder');

const { imageSearch } = require('./imageSearch');

class BotActivityHandler extends TeamsActivityHandler {
    constructor() {
        super();
        /*  Teams bots are Microsoft Bot Framework bots.
            If a bot receives a message activity, the turn handler sees that incoming activity
            and sends it to the onMessage activity handler.
            Learn more: https://aka.ms/teams-bot-basics.

            NOTE:   Ensure the bot endpoint that services incoming conversational bot queries is
                    registered with Bot Framework.
                    Learn more: https://aka.ms/teams-register-bot. 
        */
        // Registers an activity event handler for the message event, emitted for every incoming message activity.

        this.onMessage(async (context, next) => {
            TurnContext.removeRecipientMention(context.activity);
            var cmd = context.activity.text;
            if(cmd.indexOf(' ') > 0) cmd = context.activity.text.substr(0, cmd.indexOf(' '));
            switch (cmd.trim().toLowerCase()) {
                case 'hello':
                    await this.mentionActivityAsync(context);
                    break;
                case 'show':
                    await this.showActivityAsync(context);
                    break;
                default:
                    // By default for unknown activity sent by user show
                    // a card with the available actions.
                    const value = { count: 0 };
                    const card = CardFactory.heroCard(
                        'Lets talk...',
                        null,
                        [{
                            type: ActionTypes.MessageBack,
                            title: 'Say Hello',
                            value: value,
                            text: 'Hello'
                        }]);
                    await context.sendActivity({ attachments: [card] });
                    break;
            }
            await next();
        });


    }

    /**
     * Say hello and @ mention the current user.
     */
    async mentionActivityAsync(context) {
        const TextEncoder = require('html-entities').XmlEntities;

        const mention = {
            mentioned: context.activity.from,
            text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>`,
            type: 'mention'
        };

        const replyActivity = MessageFactory.text(`Hi ${mention.text}`);
        replyActivity.entities = [mention];

        await context.sendActivity(replyActivity);
    }

    async showActivityAsync(context) {
        var replyActivity;
        var query = context.activity.text;
        if(query.indexOf(' ') > 0) {
            query = context.activity.text.substr(query.indexOf(' ')+1);
            var images = imageSearch(query);
            if(images.length <= 0)
                replyActivity = MessageFactory.text("Sorry, no images match that description :-(");
            else {
                const text = images.join(",\n\n");
                const card = CardFactory.heroCard("Here's what I found...", text);
                await context.sendActivity({ attachments: [card] });
                return;
                //replyActivity = MessageFactory.text("Searching for pics for u: " + images);
            }
        }
        else replyActivity = MessageFactory.text("Please tell me what you want to show, e.g. Show buildings");
        await context.sendActivity(replyActivity);
    }

}

module.exports.BotActivityHandler = BotActivityHandler;
