import TelegramBot from 'node-telegram-bot-api';
import { UrbanSyntheticEvent, UrbanSyntheticEventType, UrbanBot, UrbanExistingMessage, UrbanMessage, UrbanCommand, UrbanParseMode, UrbanExistingMessageByType } from '@urban-bot/core';
import { EditMessageOptions } from './format';
import { TelegramMessageMeta, TelegramPayload, TelegramBotMessage, TELEGRAM, InputMediaAudio, InputMediaFile, InputMediaAnimation } from './types';
import express from 'express';
export declare type UrbanNativeEventTelegram<Payload = TelegramPayload> = {
    type: TELEGRAM;
    payload?: Payload;
};
export declare type UrbanBotTelegramType<Payload = TelegramPayload> = {
    NativeEvent: UrbanNativeEventTelegram<Payload>;
    MessageMeta: TelegramMessageMeta;
};
export declare type TelegramOptions = {
    token: string;
    isPolling?: boolean;
    pathnamePrefix?: string;
    [key: string]: any;
};
export declare class UrbanBotTelegram implements UrbanBot<UrbanBotTelegramType> {
    options: TelegramOptions;
    static TYPE: "TELEGRAM";
    type: "TELEGRAM";
    defaultParseMode: UrbanParseMode;
    commandPrefix: string;
    client: TelegramBot;
    constructor(options: TelegramOptions);
    initializeServer(expressApp: express.Express): void;
    processUpdate(_event: UrbanSyntheticEvent<UrbanBotTelegramType>): void;
    handleMessage: (type: UrbanSyntheticEventType<UrbanBotTelegramType>, ctx: TelegramBotMessage) => void;
    handleCallbackQuery: (ctx: TelegramBot.CallbackQuery) => void;
    sendMessage(message: UrbanMessage): Promise<TelegramBot.Message>;
    updateMessage(message: UrbanExistingMessage<UrbanBotTelegramType>): void;
    deleteMessage(message: UrbanExistingMessage<UrbanBotTelegramType>): void;
    editMedia(message: UrbanExistingMessageByType<UrbanBotTelegramType, 'urban-img' | 'urban-audio' | 'urban-video' | 'urban-file' | 'urban-animation'>): void;
    initializeCommands(commands: UrbanCommand[]): any;
    editMessageMedia(media: TelegramBot.InputMedia | InputMediaAudio | InputMediaAnimation | InputMediaFile, options: EditMessageOptions, formData?: unknown): any;
    simulateTyping(chatId: string, simulateTyping?: number): Promise<void>;
}
