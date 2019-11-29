import { History, LocationState } from "history";

export interface IProps {
    someOfYourOwnProps: any;
    history: History<LocationState>;
    someMorePropsIfNeedIt: any;
}

export interface IUser {
    id: string
    name: string
    room: string
}

export interface IErrorObject {
    message: string
}
