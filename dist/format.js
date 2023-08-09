"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTelegramMedia = exports.formatParamsForExistingMessage = exports.formatParamsForNewMessage = void 0;
function formatKeyboard(message) {
    const buttons = message.data.buttons;
    const formatButtons = ({ id, webApp, ...other }) => ({
        ...(webApp ? { web_app: webApp } : { callback_data: id }),
        ...other,
    });
    if (Array.isArray(buttons[0])) {
        return buttons.map((elem) => {
            const buttons = Array.isArray(elem) ? elem : [elem];
            return buttons.map(formatButtons);
        });
    }
    return [buttons.map(formatButtons)];
}
function formatReplyMarkupForNewMessage(message) {
    if (message.data.forceReply !== undefined) {
        const replyMarkup = {
            force_reply: message.data.forceReply,
        };
        if ('selective' in message.data && typeof message.data.selective === 'boolean') {
            replyMarkup.selective = message.data.selective;
        }
        return replyMarkup;
    }
    if (message.data.buttons !== undefined) {
        const buttons = formatKeyboard(message);
        if (message.data.isReplyButtons === true) {
            return {
                keyboard: buttons,
                resize_keyboard: typeof message.data.isResizedKeyboard === 'boolean' ? message.data.isResizedKeyboard : undefined,
            };
        }
        return {
            inline_keyboard: buttons,
        };
    }
    if ('isRemoveKeyboard' in message.data && message.data.isRemoveKeyboard) {
        return {
            remove_keyboard: true,
        };
    }
}
function formatReplyMarkupForExistingMessage(message) {
    if (message.data.buttons !== undefined) {
        return {
            inline_keyboard: formatKeyboard(message),
        };
    }
}
function formatParseMode(parseMode) {
    if (parseMode === undefined) {
        return undefined;
    }
    return parseMode === 'HTML' ? 'HTML' : 'MarkdownV2';
}
function formatParams(message) {
    const parse_mode = formatParseMode(message.data.parseMode);
    if (message.nodeName === 'urban-text') {
        if (message.data.disableWebPagePreview === true) {
            return {
                parse_mode,
                disable_web_page_preview: message.data.disableWebPagePreview,
            };
        }
    }
    return {
        parse_mode,
    };
}
function formatParamsForNewMessage(message) {
    const params = formatParams(message);
    if (message.data.replyToMessageId !== undefined) {
        params.reply_to_message_id = Number(message.data.replyToMessageId);
    }
    params.reply_markup = formatReplyMarkupForNewMessage(message);
    return params;
}
exports.formatParamsForNewMessage = formatParamsForNewMessage;
function formatParamsForExistingMessage(message) {
    const params = formatParams(message);
    params.reply_markup = formatReplyMarkupForExistingMessage(message);
    return params;
}
exports.formatParamsForExistingMessage = formatParamsForExistingMessage;
function getTelegramMedia(message, parseMode) {
    const common = {
        caption: message.data.title,
        parse_mode: parseMode,
    };
    switch (message.nodeName) {
        case 'urban-img': {
            return {
                ...common,
                type: 'photo',
            };
        }
        case 'urban-audio': {
            return {
                ...common,
                type: 'audio',
                duration: message.data.duration,
                performer: message.data.author,
                title: message.data.name,
            };
        }
        case 'urban-video': {
            return {
                ...common,
                type: 'video',
                duration: message.data.duration,
                height: message.data.height,
                width: message.data.width,
            };
        }
        case 'urban-animation': {
            return {
                ...common,
                type: 'animation',
                duration: message.data.duration,
                height: message.data.height,
                width: message.data.width,
            };
        }
        case 'urban-file': {
            return {
                ...common,
                type: 'document',
            };
        }
        default: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            throw new Error(message.nodeName + ' doesn\t support');
        }
    }
}
exports.getTelegramMedia = getTelegramMedia;
//# sourceMappingURL=format.js.map