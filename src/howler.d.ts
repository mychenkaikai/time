declare module 'howler' {
  export class Howl {
    constructor(options: any);
    play(): number;
    pause(): this;
    stop(): this;
    volume(volume?: number): number | this;
    seek(seek?: number): number;
    duration(): number;
    playing(): boolean;
    unload(): void;
    on(event: string, callback: () => void): this;
  }
}

