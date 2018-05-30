import { SimpleEventDispatcher, ISimpleEvent } from 'ste-simple-events';


class MouseManager {
    private static _instance: MouseManager;
    private mouseMoved = new SimpleEventDispatcher<MouseEvent>();

    private constructor() {

    }

    public static get Instance(): MouseManager {
        // create it on first use
        return this._instance || (this._instance = new this());
    }

    public get mouseMoveHook(): ISimpleEvent<MouseEvent> {
        return this.mouseMoved.asEvent();
    }
}

export const MouseManagerInstance = MouseManager.Instance;
