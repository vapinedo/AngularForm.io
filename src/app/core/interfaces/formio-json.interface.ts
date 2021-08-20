export interface FormioJSON {
    title: string;
    components: FormioComponent[];
}

export interface FormioComponent {
    id?: string;
    key?: string;
    label: string;
    type: string;
    input?: boolean;
    theme?: string;
    action?: string;
    placeholder?: string;
    eventListener?: EventListener;
}

interface EventListener {
    event: string;
    action: Action;
}

interface Action {
    method: string;
    serviceURL: string;
}