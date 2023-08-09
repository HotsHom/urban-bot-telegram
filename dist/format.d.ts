import { UrbanBotType, UrbanExistingMessageByType, UrbanMessage } from '@urban-bot/core';
import TelegramBot from 'node-telegram-bot-api';
export declare type EditMessageOptions = TelegramBot.EditMessageTextOptions | TelegramBot.EditMessageCaptionOptions | TelegramBot.EditMessageLiveLocationOptions | TelegramBot.EditMessageReplyMarkupOptions;
export declare function formatParamsForNewMessage(message: UrbanMessage): TelegramBot.SendMessageOptions;
export declare function formatParamsForExistingMessage(message: UrbanMessage): EditMessageOptions;
export declare function getTelegramMedia(message: UrbanExistingMessageByType<UrbanBotType, 'urban-img' | 'urban-audio' | 'urban-video' | 'urban-file' | 'urban-animation'>, parseMode: TelegramBot.ParseMode | undefined): {
    readonly type: "photo";
    readonly caption: string | undefined;
    readonly parse_mode: TelegramBot.ParseMode | undefined;
} | {
    readonly type: "audio";
    readonly duration: number | undefined;
    readonly performer: string | undefined;
    readonly title: string | undefined;
    readonly caption: string | undefined;
    readonly parse_mode: TelegramBot.ParseMode | undefined;
} | {
    readonly type: "video";
    readonly duration: number | undefined;
    readonly height: number | undefined;
    readonly width: number | undefined;
    readonly caption: string | undefined;
    readonly parse_mode: TelegramBot.ParseMode | undefined;
} | {
    readonly type: "animation";
    readonly duration: number | undefined;
    readonly height: number | undefined;
    readonly width: number | undefined;
    readonly caption: string | undefined;
    readonly parse_mode: TelegramBot.ParseMode | undefined;
} | {
    readonly type: "document";
    readonly caption: string | undefined;
    readonly parse_mode: TelegramBot.ParseMode | undefined;
};
