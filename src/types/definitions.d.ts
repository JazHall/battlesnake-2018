import {Request, Response} from "express";

declare module battlesnake.Definitions {    

    // --- Request Interfaces ---

    export interface StartRequest extends Request {
        body: StartRequestData;
    }

    export interface StartRequestData {
        game_id: string;
        height: number;
        width: number;
    }

    interface StartSend {
        (status: number, body?: StartResponseData): StartResponse;
        (body?: StartResponseData): StartResponse;
    }

    // --- Response Interfaces ---

    export interface StartResponse {
        json: StartSend;
    }

    export interface StartResponseData {
        color: string;
        name: string;
        head_url?: string;
        taunt?: string;
    }

    // --- Move Request Interfaces ---

    export interface MoveRequest extends Request {
        body: MoveRequestData
    }

    export interface MoveRequestData {
        game_id: string;
        height: number;
        width: number;
        turn: number;
        you: string;
        food: Point[];
        snakes: Snake[];
    }

    interface MoveSend {
        (status: number, body?: MoveResponseData): MoveResponse;
        (body?: MoveResponseData): MoveResponse;
    }

    // --- Move Repsonse Interfaces ---

    export interface MoveResponse {
        json: MoveSend;
    }

    export interface MoveResponseData {
        move: Move;
        taunt?: string;
    }

    // --- Snake & Other Interfaces ---

    export interface Snake {
        id: string;
        name: string;
        taunt: string;
        health_points: number;
        coords: Point[];
    }

    export interface Point {
        x: number;
        y: number;
    }

    export interface Config {
        //Set a bunch of properties that we'd like to configure globally
        //The config values will be set at runtime via .json file
        
    }

    // --- Global Types ---

    export type Move = "up" | "down" | "left" | "right";
    export type State = "head" | "body" | "food" | "empty"
    export type SnakeType = "self" | "enemy"
}
export = battlesnake;