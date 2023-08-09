import TelegramBot from 'node-telegram-bot-api';
export declare type TELEGRAM = 'TELEGRAM';
export declare type TelegramBotLostMessage = {
    dice?: {
        value: number;
    };
};
export declare type TelegramBotMessage = TelegramBot.Message & TelegramBotLostMessage;
export declare type TelegramPayload = TelegramBotMessage | TelegramBot.CallbackQuery;
export declare type TelegramMessageMeta = TelegramBotMessage;
export declare type InputMediaAudio = TelegramBot.InputMediaBase & {
    type: 'audio';
    duration?: number;
    performer?: string;
    title?: string;
};
export declare type InputMediaFile = TelegramBot.InputMediaBase & {
    type: 'document';
    title?: string;
};
export declare type InputMediaAnimation = TelegramBot.InputMediaBase & {
    type: 'animation';
    duration?: number;
    title?: string;
};
